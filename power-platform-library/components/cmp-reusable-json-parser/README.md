# Reusable JSON Parser

Action component that parses a JSON array and returns a table with the columns `COL1` through `COL5`. Empty or invalid input returns a blank fallback row.

## Action

- `ParseJsonToTable(Json_Array)` - Accepts a JSON array string and returns a table.

## Usage

Import `cmp-reusable-json-parser.yml` and call `ParseJsonToTable` with a JSON array string. Ensure the source objects use the expected `COL1` through `COL5` fields.
