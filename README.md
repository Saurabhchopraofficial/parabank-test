# Parabank Playwright Test Suite

Automated end-to-end tests for the Parabank demo banking application using Playwright.

---

## Project Overview

This project contains Playwright tests covering user flows such as:

- User registration
- Login
- Account creation
- Fund transfer with API validation
- Bill payment

The tests interact with both the UI and backend APIs to ensure end-to-end functionality.

---

## Prerequisites

- Node.js (v14+ recommended)
- Google Chrome browser installed locally on your machine

---

## Running Tests

> **Important:**  
> Due to compatibility issues, the tests run on your locally installed **Google Chrome** browser instead of the Playwright bundled Chromium.

### Run tests on local Chrome

```bash
npx playwright test --project=chromium --channel=chrome
