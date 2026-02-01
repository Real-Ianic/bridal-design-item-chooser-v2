# How to Create a Google Sheets API Key in GCP

## Step-by-Step Guide

### Step 1: Go to Google Cloud Console

1. Open your browser and go to: https://console.cloud.google.com/
2. Make sure you're logged in with the correct Google account

### Step 2: Select Your Project

1. At the top of the page, click on the project dropdown (it might say "Select a project")
2. Find and click on **"bridal-custom-calculator"**
3. The project name should now appear at the top

### Step 3: Enable Google Sheets API (if not already enabled)

1. In the left sidebar, click on **"APIs & Services"** → **"Library"**
2. In the search bar, type: **"Google Sheets API"**
3. Click on **"Google Sheets API"** from the results
4. If you see an **"ENABLE"** button, click it
5. If you see **"MANAGE"**, it's already enabled - you can skip to Step 4

### Step 4: Create an API Key

1. In the left sidebar, click on **"APIs & Services"** → **"Credentials"**
2. At the top of the page, click **"+ CREATE CREDENTIALS"**
3. From the dropdown, select **"API key"**
4. A popup will appear with your new API key - **COPY IT NOW!**
5. The key will look something like: `AIzaSyDxxx...` (starts with "AIza")

### Step 5: (Optional but Recommended) Restrict the API Key

1. In the popup, click **"EDIT API KEY"** (or click the pencil icon next to your key in the credentials list)
2. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check **"Google Sheets API"**
3. Under **"Application restrictions"** (optional):
   - Select **"HTTP referrers (web sites)"**
   - Click **"ADD AN ITEM"**
   - Add: `http://localhost:3000/*` (for development)
   - Add your production domain when you deploy (e.g., `https://yourdomain.com/*`)
4. Click **"SAVE"**

### Step 6: Add the API Key to Your Project

1. Open your project in VS Code (or your editor)
2. Open the file: `.env.local`
3. Replace the line with your new API key:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=AIzaSyDxxx...your_actual_key_here
   ```
4. Save the file

### Step 7: Share Your Google Sheet with the Service Account (Important!)

Even though you're using an API key, you still need to give the service account access to your sheet:

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1P_3gPMKVcO0HXhuF66B5_CtcmbkBlHqYTQGTLWEGGxo/edit
2. Click the **"Share"** button (top right corner)
3. In the "Add people and groups" field, paste this email:
   ```
   sheets-api-service@bridal-custom-calculator.iam.gserviceaccount.com
   ```
4. Set the permission to **"Viewer"**
5. **UNCHECK** "Notify people" (no need to send an email)
6. Click **"Share"** or **"Done"**

### Step 8: Test It!

1. Go back to your browser with the app: http://localhost:3000
2. The page should automatically reload (Next.js hot reload)
3. You should see:
   - Loading spinner briefly
   - Items appearing in the selectors
4. Open browser DevTools (F12) → Console tab
5. You should see: `📊 Fetching data from sheet: Photography` etc.
6. No error messages!

---

## Troubleshooting

### "API key not valid" error
- Make sure you copied the entire key
- Check there are no extra spaces in `.env.local`
- Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again

### "The caller does not have permission"
- Make sure you shared the sheet with the service account email
- Check the service account has "Viewer" permission
- Wait a minute for permissions to propagate

### Still not working?
- Check the browser console (F12) for detailed error messages
- Make sure Google Sheets API is enabled in your GCP project
- Verify the spreadsheet ID in `lib/google-sheets-config.ts` is correct

---

## Summary

✅ **What you need to do:**
1. Go to GCP Console → APIs & Services → Credentials
2. Create API Key
3. Copy the key to `.env.local`
4. Share your Google Sheet with: `sheets-api-service@bridal-custom-calculator.iam.gserviceaccount.com`
5. Refresh your app!

That's it! The API key allows your frontend to access Google Sheets API, and sharing the sheet with the service account gives it permission to read your specific spreadsheet.
