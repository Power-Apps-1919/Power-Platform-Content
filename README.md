# Power Apps Custom Components Library

This repository contains a collection of reusable, well-documented custom components for Microsoft Power Apps Canvas Apps. Each component is designed for clarity, maintainability, and ease of integration into your own Power Apps projects.

## Components Included

- **Card Control**: Displays a card with a customizable title and value, ideal for dashboards and summary views.
- **Custom Notification**: Flexible notification component for displaying success, error, or informational messages.
- **Reusable JSON Parser**: Utility component for custom logic and operations.
- **Email Popup**: A modal popup for email entry and notifications.
- **Loading Animation**: Shows a loading spinner and message overlay.
- **Popup**: General-purpose modal dialog with customizable actions.
- **StatusBadge**: Displays a colored badge with status text and icon (e.g., Active, Inactive, Pending, Error).
- **TimePicker**: User-friendly time selection component with interval and range controls.

## Features

- All properties and children are clearly named and described for easy understanding.
- Consistent naming conventions and event logic across all components.
- Designed for maintainability and extensibility.
- Ready to import into Power Apps as YAML component definitions.

## Usage

1. **Import a Component**
   - In Power Apps Studio, go to the Components section.
   - Open the desired YAML file from this repository, copy its contents, and paste them into Power Apps Studio.

2. **Configure Properties**
   - Set the custom properties (e.g., titles, values, event handlers) as needed in your app.

3. **Customize as Needed**
   - All components are designed to be easily extended or styled to fit your app's requirements.

## File Structure

```
Card_Control.yml
Custom_Notification.yml
Custom_Operations.yml
Email_Popup.yml
Loading_Animation.yml
Popup.yml
StatusBadge.yml
TimePicker.yml
```

## Contributing

Contributions are welcome! Please:
- Use clear, descriptive names for all properties and children.
- Add meaningful descriptions to all custom properties.
- Ensure new components follow the established structure and naming conventions.

> Built and maintained by Hemanth Sai. For questions or suggestions, please open an issue or pull request.
