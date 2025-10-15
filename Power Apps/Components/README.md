# Power Apps Custom Components

## Pre-requisites

### For `Email_Popup` Component
- **Office365Users Connector**:  
  The `Office365Users` connector must be added to your app before using this component.  
  - In Power Apps Studio, go to **Data** > **Add data** > search for `Office 365 Users` and add it.
- **Office365Outlook Connector**:  
  The `Office365Outlook` connector is required for sending emails directly from the popup.  
  - In Power Apps Studio, go to **Data** > **Add data** > search for `Office 365 Outlook` and add it.
- **Power Automate Flows** (optional):  
  If you use Power Automate flows to send emails, you can integrate them within the logic for the SendYesButton.

**Note:**  
For `Email_Popup`, always adjust the ComboBox fields (To, CC, BCC) to use the "Person" data layout for the best user experience.  
If the ComboBoxes are not working as expected, remove them and add them again with the "Person" data layout.

### For `Reusable_JSON_Parser` Component
- No special connectors required.
- Input JSON must match the expected dummy column structure (COL1–COL5) for best results.

---

## Usage

- Import the component(s) into your app.
- For `Email_Popup`, ensure all dependencies above are satisfied.
- For `Reusable_JSON_Parser`, simply call the `ParseJsonToTable` action with your JSON array.

---
