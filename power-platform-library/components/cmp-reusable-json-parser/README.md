---
title: 'Reusable JSON Parser'
description: 'Action component that parses JSON arrays into Power Apps tables.'
date: 2026-09-16
tags:
  - components
  - input-utility
  - json
---
# Reusable JSON Parser

## Business value
Turn structured JSON returned by a flow, connector, or service into a table that a Canvas App can use. This can reduce repetitive transformation work in apps that integrate with other systems.

## Best for
- Power Automate responses.
- Small, predictable JSON payloads.
- Reusable integrations with a known response shape.

## What to provide
- `ParseJsonToTable(Json_Array)`: a JSON array using the documented `COL1` through `COL5` structure.

## Important limitation
Validate the response before using it in a business-critical process. Empty or invalid input returns a fallback row; your app should still explain errors and provide a recovery path.

## Getting started
Download `cmp-reusable-json-parser.yml`, test it with sample and invalid payloads, then connect it to the flow or service that owns the data.
