# Google Sheets API Setup Guide

## Important: Frontend-Only Limitation

Since this is a frontend-only application, we cannot use the service account JSON file directly in the browser. Instead, we need to use an API key.

## Setup Steps

### Option 1: Create an API Key (Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `bridal-custom-calculator`
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **API Key**
5. Copy the generated API key
6. (Optional but recommended) Click **Restrict Key**:
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `localhost:3000` for development, your production domain)
   - Under "API restrictions", select "Restrict key" and choose "Google Sheets API"
7. Save the restrictions

### Option 2: Make the Google Sheet Publicly Accessible

If you don't want to use an API key:

1. Open your Google Sheet
2. Click **Share** button
3. Under "General access", select **Anyone with the link** → **Viewer**
4. This allows the app to read the sheet without authentication

**Note:** This makes your pricing data publicly visible. Use Option 1 for better security.

## Configuration

After obtaining an API key:

1. Open `.env.local` file in the project root
2. Replace `your_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=AIzaSy...your_actual_key
   ```
3. Save the file
4. Restart the development server

## Testing

Run the development server:
```bash
npm run dev
```

Open http://localhost:3000 and check:
- The app should load pricing data from Google Sheets
- Items should appear in each selector
- Console should not show any API errors

## Troubleshooting

### "API key not configured" error
- Make sure you've added the API key to `.env.local`
- Restart the development server after adding the key

### "Failed to fetch sheet data" error
- Check that the Google Sheets API is enabled in your Google Cloud project
- Verify the spreadsheet ID is correct in `lib/google-sheets-config.ts`
- Ensure the sheet names match exactly (case-sensitive)

### "Access denied" error
- If using API key: Make sure the API key has access to Google Sheets API
- If using public access: Make sure the sheet is set to "Anyone with the link can view"
- The service account email (`sheets-api-service@bridal-custom-calculator.iam.gserviceaccount.com`) needs to be given "Viewer" access to the spreadsheet

### Using Service Account (Alternative)

If you want to use the service account instead:
1. Open your Google Sheet
2. Click **Share**
3. Add the service account email: `sheets-api-service@bridal-custom-calculator.iam.gserviceaccount.com`
4. Give it "Viewer" permissions
5. You'll need to implement a backend proxy to use the service account (not supported in frontend-only mode)
