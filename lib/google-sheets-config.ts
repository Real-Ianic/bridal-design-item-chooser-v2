// Google Sheets Configuration
// Spreadsheet ID extracted from: https://docs.google.com/spreadsheets/d/1P_3gPMKVcO0HXhuF66B5_CtcmbkBlHqYTQGTLWEGGxo/edit

export const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: '1P_3gPMKVcO0HXhuF66B5_CtcmbkBlHqYTQGTLWEGGxo',
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || '',

    // Sheet names for each category
    sheetNames: {
        photography: 'Photography',
        dress: 'Dress',
        videography: 'Videography',
        hairMakeup: 'HairMakeUp',
        florist: 'Florist',
    },

    // Google Sheets API endpoint
    apiBaseUrl: 'https://sheets.googleapis.com/v4/spreadsheets',
} as const

// Type definitions for Google Sheets data
export interface SheetRow {
    id: string
    name: string
    price: number
    description: string
    customPrice: number // 0 or 1
    option: string // For simple items
    // HairMakeUp specific fields
    freshLook?: string
    class?: string
}

export interface ItemOption {
    optionValues: string[] // Array of option values (e.g., ["Director Make Up", "2 Fresh Look"])
    price: number
    description: string
    customPrice: boolean
}

export interface ItemData {
    id: string
    name: string
    description: string
    options: ItemOption[] // Multiple options for the same item
    hasCustomPrice: boolean
}

// HairMakeUp specific types for multi-dimensional selection
export interface HairMakeUpOption {
    freshLook: string
    class: string
    price: number
    customPrice: boolean
}

export interface HairMakeUpItemData {
    id: string
    name: string // Vendor name
    description: string
    options: HairMakeUpOption[] // All combinations of freshLook + class
    freshLookOptions: string[] // Unique fresh look options
    classOptions: string[] // Unique class options
    hasCustomPrice: boolean
}

export interface PricingData {
    photography: ItemData[]
    dress: ItemData[]
    videography: ItemData[]
    hairMakeup: HairMakeUpItemData[]
    florist: ItemData[]
}

