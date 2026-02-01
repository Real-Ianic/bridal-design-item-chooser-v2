# Troubleshooting: API Key Still Getting 403 Error

## The Issue
Even though you've:
- ✅ Created an API key
- ✅ Shared the sheet with the service account

You're still getting a 403 "permission denied" error. This means the **API key itself** doesn't have permission to use Google Sheets API.

## Most Likely Causes

### 1. Google Sheets API Not Enabled (Most Common)

**Fix:**
1. Go to: https://console.cloud.google.com/apis/library/sheets.googleapis.com
2. Make sure you're in the **"bridal-custom-calculator"** project (check the top)
3. Click the **"ENABLE"** button
4. Wait 30 seconds for it to activate
5. Refresh your app

### 2. API Key Has Restrictions That Block Google Sheets API

**Fix:**
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your API key in the list (the one that starts with `AIzaSyAkRT6...`)
3. Click on it to edit
4. Scroll to **"API restrictions"**
5. Check if it says **"Don't restrict key"** OR if Google Sheets API is in the allowed list
6. If Google Sheets API is NOT in the list:
   - Select **"Don't restrict key"** (for testing)
   - OR add "Google Sheets API" to the allowed APIs
7. Click **"SAVE"**
8. Wait 1-2 minutes for changes to propagate
9. Refresh your app

### 3. API Key Was Created in Wrong Project

**Fix:**
1. Go to: https://console.cloud.google.com/apis/credentials
2. Check the project name at the top - it should say **"bridal-custom-calculator"**
3. If it's a different project, you need to create a new API key in the correct project

## Quick Test

After making changes above, test if it works:
1. Wait 1-2 minutes
2. Go to your app: http://localhost:3000
3. Open browser console (F12)
4. Refresh the page
5. Look for `📊 Fetching data from sheet: Photography` messages

## What to Check Right Now

**Step 1:** Check if Google Sheets API is enabled
- Go to: https://console.cloud.google.com/apis/library/sheets.googleapis.com
- Make sure project is "bridal-custom-calculator"
- Should show "API enabled" with a green checkmark
- If not, click ENABLE

**Step 2:** Check API key restrictions
- Go to: https://console.cloud.google.com/apis/credentials
- Click on your API key
- Under "API restrictions", it should either be:
  - "Don't restrict key" (easiest for testing)
  - OR "Restrict key" with "Google Sheets API" checked

## Still Not Working?

If you've done all the above and it still doesn't work, there might be an issue with the API key itself. Try:

1. **Delete the old API key**
2. **Create a brand new API key**
3. **Don't add any restrictions** (for testing)
4. **Copy the new key to `.env.local`**
5. **Restart the dev server**: Stop (Ctrl+C) and run `npm run dev`

---

## Screenshot What to Look For

When you go to https://console.cloud.google.com/apis/credentials and click on your API key, you should see:

**API restrictions section:**
- Either: "Don't restrict key" (radio button selected)
- Or: "Restrict key" with "Google Sheets API" in the list

If you see "Restrict key" but Google Sheets API is NOT in the list, that's the problem!
