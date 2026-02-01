# Google Sheets Data Structure (Verified)

## Standard Items (Photography, Videography, Dress, Florist)

### Column Layout
| Column | Name | Description | Example |
|--------|------|-------------|---------|
| A | ID | Unique identifier | 1, 2, 3 |
| B | Name | Item/Service name | "Kent Wong" |
| C | Price | Price in dollars | 7088 |
| D | Option | Optional description | (can be empty) |
| E | CustomPrice | 1 = custom price, 0 = fixed | 0 or 1 |

**Display:** Just show the Name as a button. If Option exists, it may be appended.

---

## HairMakeUp (Multi-Dimensional Options)

### Column Layout (Verified)
| Column | Name | Description | Example |
|--------|------|-------------|---------|
| A | ID | Unique identifier | 1 |
| B | Name | Vendor name | "Autelier Make-Up" |
| C | Price | Price for this combination | 500, 1500, 2500 |
| D | Fresh Look | Number of fresh looks | "1 Fresh Look", "2 Fresh Looks" |
| E | Class | MUA class/tier | "Director MakeUp", "Senior MakeUp" |
| F | CustomPrice | 1 = custom price, 0 = fixed | 0 or 1 |
| G | Description | Service description (optional) | "Senior and Lead MUA" |

### How It Works

**Example Data:**
```
ID | Name              | Price | Fresh Look | Class             | CustomPrice | Description
1  | Autelier Make-Up  | 500   | 1          | Senior & Lead     | 0           | ...
1  | Autelier Make-Up  | 621   | 1          | Director MUA      | 0           | ...
```

### Display Format

**Step 1:** User selects a Vendor (Name)
- Shows buttons: "Autelier Make-Up", "Alycia Tan", etc.

**Step 2:** After selecting vendor, show TWO separate option groups (if applicable):
- **Fresh Look Selector:** Radio buttons for "1", "2", etc.
- **Artist Tier/Class Selector:** Radio buttons for "Senior & Lead", "Director MUA", etc.

**Step 3:** Price is determined by the combination
- The app scans the sheet rows to find the row that matches the selected Vendor + Fresh Look + Class, and uses that row's Price.

---

## Important

- **Do not mix up columns:** HairMakeUp has a different structure (columns D and E) compared to other sheets.
- **Empty Cells:** Ensure all rows have values for Fresh Look and Class if they define a valid combination.
