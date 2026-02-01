import { GOOGLE_SHEETS_CONFIG, type SheetRow, type ItemData, type ItemOption, type PricingData } from './google-sheets-config'

/**
 * Fetches data from a specific Google Sheet
 * @param sheetName - Name of the sheet to fetch
 * @returns Array of rows from the sheet
 */
export async function fetchSheetData(sheetName: string): Promise<SheetRow[]> {
    const { spreadsheetId, apiKey, apiBaseUrl } = GOOGLE_SHEETS_CONFIG

    if (!apiKey) {
        console.error('❌ Google Sheets API key is not configured!')
        console.error('Please add your API key to .env.local file')
        console.error('See GOOGLE_SHEETS_SETUP.md for instructions')
        return []
    }

    try {
        // HairMakeUp sheet has additional columns (F and G)
        const isHairMakeUp = sheetName === 'HairMakeUp'
        const range = isHairMakeUp ? `${sheetName}!A:G` : `${sheetName}!A:E`
        const url = `${apiBaseUrl}/${spreadsheetId}/values/${range}?key=${apiKey}`

        console.log(`📊 Fetching data from sheet: ${sheetName}`)

        const response = await fetch(url)

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`❌ Failed to fetch sheet "${sheetName}":`, response.status, response.statusText)
            console.error('Response:', errorText)

            if (response.status === 403) {
                console.error('🔒 Access denied. Possible reasons:')
                console.error('1. Invalid API key - create a new one at https://console.cloud.google.com/apis/credentials')
                console.error('2. Google Sheets API not enabled for your project')
                console.error('3. Sheet is not publicly accessible and API key lacks permissions')
            } else if (response.status === 400) {
                console.error('⚠️ Bad request. Check that:')
                console.error('1. Spreadsheet ID is correct')
                console.error('2. Sheet name is correct (case-sensitive)')
            }

            throw new Error(`Failed to fetch sheet data: ${response.statusText}`)
        }

        const data = await response.json()
        const rows = data.values || []

        // Skip header row and parse data
        if (rows.length <= 1) {
            return []
        }

        const parsedRows: SheetRow[] = []

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i]

            // Skip empty rows
            if (!row || row.length === 0 || !row[0]) {
                continue
            }

            let baseRow: SheetRow

            if (isHairMakeUp) {
                // HairMakeUp Mapping:
                // A: ID (0), B: Name (1), C: Price (2), D: Fresh Look (3), E: Class (4), F: CustomPrice (5), G: Description (6)
                baseRow = {
                    id: String(row[0] || ''),
                    name: String(row[1] || ''),
                    price: parseFloat(row[2]) || 0,
                    option: '', // Not used for HairMakeUp
                    description: String(row[6] || row[1] || ''), // Use Description col or Name
                    customPrice: parseInt(row[5]) || 0,
                    freshLook: String(row[3] || ''),
                    class: String(row[4] || '')
                }
            } else {
                // Standard Mapping:
                // A: ID (0), B: Name (1), C: Price (2), D: Option (3), E: CustomPrice (4)
                baseRow = {
                    id: String(row[0] || ''),
                    name: String(row[1] || ''),
                    price: parseFloat(row[2]) || 0,
                    option: String(row[3] || ''),
                    description: String(row[1] || ''), // Use name as description by default
                    customPrice: parseInt(row[4]) || 0,
                }
            }

            parsedRows.push(baseRow)
        }

        return parsedRows
    } catch (error) {
        console.error(`Error fetching sheet "${sheetName}":`, error)
        return []
    }
}

/**
 * Groups sheet rows by ID and creates ItemData structure
 * Items with the same ID but different options are grouped together
 */
/**
 * Groups sheet rows by ID and creates ItemData structure
 * Items with the same ID but different options are grouped together
 */
function groupItemsByID(rows: SheetRow[]): ItemData[] {
    const itemsMap = new Map<string, ItemData>()

    for (const row of rows) {
        const { id, name, option, price, description, customPrice } = row

        if (!itemsMap.has(id)) {
            itemsMap.set(id, {
                id,
                name,
                description,
                options: [],
                hasCustomPrice: customPrice === 1,
            })
        }

        const item = itemsMap.get(id)!

        // Parse option string into array (comma-separated)
        const optionValues = option ? option.split(',').map(o => o.trim()) : []

        item.options.push({
            optionValues,
            price,
            description,
            customPrice: customPrice === 1,
        })
    }

    return Array.from(itemsMap.values())
}

/**
 * Groups HairMakeUp rows by ID and creates structure for multi-dimensional selectors
 */
import type { HairMakeUpItemData, HairMakeUpOption } from './google-sheets-config'

function groupHairMakeUpItems(rows: SheetRow[]): HairMakeUpItemData[] {
    const itemsMap = new Map<string, HairMakeUpItemData>()

    for (const row of rows) {
        const { id, name, description, customPrice, price, freshLook, class: classType } = row

        if (!itemsMap.has(id)) {
            itemsMap.set(id, {
                id,
                name,
                description,
                options: [],
                freshLookOptions: [],
                classOptions: [],
                hasCustomPrice: customPrice === 1,
            })
        }

        const item = itemsMap.get(id)!

        // Add option variant
        const option: HairMakeUpOption = {
            freshLook: freshLook || '',
            class: classType || '',
            price,
            customPrice: customPrice === 1
        }
        item.options.push(option)

        // Collect unique option values for selectors
        if (freshLook && !item.freshLookOptions.includes(freshLook)) {
            item.freshLookOptions.push(freshLook)
        }
        if (classType && !item.classOptions.includes(classType)) {
            item.classOptions.push(classType)
        }
    }

    return Array.from(itemsMap.values())
}

/**
 * Fetches all pricing data from all sheets
 * @returns Complete pricing data for all categories
 */
export async function fetchAllPricingData(): Promise<PricingData> {
    const { sheetNames } = GOOGLE_SHEETS_CONFIG

    try {
        // Fetch all sheets in parallel
        const [photographyRows, dressRows, videographyRows, hairMakeupRows, floristRows] = await Promise.all([
            fetchSheetData(sheetNames.photography),
            fetchSheetData(sheetNames.dress),
            fetchSheetData(sheetNames.videography),
            fetchSheetData(sheetNames.hairMakeup),
            fetchSheetData(sheetNames.florist),
        ])

        // Group items by ID for each category
        return {
            photography: groupItemsByID(photographyRows),
            dress: groupItemsByID(dressRows),
            videography: groupItemsByID(videographyRows),
            hairMakeup: groupHairMakeUpItems(hairMakeupRows), // Use special grouping for Hair & Makeup
            florist: groupItemsByID(floristRows),
        }
    } catch (error) {
        console.error('Error fetching all pricing data:', error)

        // Return empty data structure on error
        return {
            photography: [],
            dress: [],
            videography: [],
            hairMakeup: [],
            florist: [],
        }
    }
}
