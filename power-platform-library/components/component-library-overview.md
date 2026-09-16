# Reusable Power Apps Components

Use these components to improve consistency, reduce build time, and give users a more familiar experience across your Canvas Apps.

Each component includes a downloadable YAML definition and a plain-language guide. You can use the component as provided, or tailor its colours, labels, data, and business rules to your app.

## Find the right component

- **Charts** help people understand trends, comparisons, progress, and proportions.
- **Cards and badges** make important values and statuses visible at a glance.
- **Popups and notifications** help users confirm actions and understand outcomes.
- **Loading and divider controls** improve clarity while an app is working or presenting information.
- **Time and JSON utilities** support common operational and data-entry scenarios.

## Before you start

Make sure you have access to Power Apps Studio and permission to add components to your app. Some components may also use Microsoft 365 connectors or Power Automate. Their individual guides identify those requirements.

## Recommended adoption approach

1. Try the component in a development or test app.
2. Connect it to sample data first.
3. Confirm the labels, colours, keyboard experience, and mobile layout meet your standards.
4. Replace sample values with governed business data.
5. Document any changes before promoting the app to users.

## Email popup prerequisites

The email popup may require Office 365 Users and Office 365 Outlook. Add only the connectors your business process needs, and confirm that users have the appropriate permissions to send messages.

## JSON parser expectations

The reusable JSON parser is intended for predictable JSON arrays using the documented column structure. Validate incoming data and handle errors before relying on the output in a business-critical process.
