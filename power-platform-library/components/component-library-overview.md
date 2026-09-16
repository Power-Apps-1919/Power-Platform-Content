# Power Apps Custom Components

## Pre-requisites

### For `cmp-email-popup` Component
- **Office365Users Connector**:  
  The `Office365Users` connector must be added to your app before using this component.  
  - In Power Apps Studio, go to **Data** > **Add data** > search for `Office 365 Users` and add it.
- **Office365Outlook Connector**:  
  The `Office365Outlook` connector is required for sending emails directly from the popup.  
  - In Power Apps Studio, go to **Data** > **Add data** > search for `Office 365 Outlook` and add it.
- **Power Automate Flows** (optional):  
  If you use Power Automate flows to send emails, you can integrate them within the logic for the SendYesButton.

**Note:**  
For `cmp-email-popup`, always adjust the ComboBox fields (To, CC, BCC) to use the "Person" data layout for the best user experience.  
If the ComboBoxes are not working as expected, remove them and add them again with the "Person" data layout.

### For `cmp-reusable-json-parser` Component
- No special connectors required.
- Input JSON must match the expected dummy column structure (COL1–COL5) for best results.

---

## Usage

- Import the component(s) into your app.
- For `cmp-email-popup`, ensure all dependencies above are satisfied.
- For `cmp-reusable-json-parser`, simply call the `ParseJsonToTable` action with your JSON array.

## Folder structure

Each component lives in its own folder. Create a new folder using the component name,
then add the YAML file and an optional `README.md`:

```
components/
  cmp-area-chart/
    cmp-area-chart.yml
    README.md
```

The build automatically includes the README content on the published component page,
copies the YAML to the downloads area, and adds the page to search and the welcome
screen. Use `templates/component/` as a starting point for new components.

---
