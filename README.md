# Dealls Challenge QA Automation with Playwright

[![Allure Report](https://img.shields.io/badge/Allure-Report-brightgreen)](https://indrabsudirman.github.io/dealls-challenge-qa-automation/)

This is a test automation framework using [Playwright](https://playwright.dev/) for the Dealls QA Automation Challenge.

First of all, I would like to express my sincere gratitude to the Dealls Recruitment Team for giving me the opportunity to work on this challenge.

For this project, I used **Playwright with TypeScript** and automated the following three test scenarios:

1. Verify user can access the Dealls Mentoring Page
2. Login
3. Register a new Job-Seeker / Mentee

## ✨ Features

- ✅ Playwright test runner with tag-based execution
- 📊 Allure Report for rich visual test reports
- 🧪 Test filtering via `@smoke`, `@regression`, `@critical`, or specific scenario tag e.g `@register`
- ♻️ GitHub Actions CI with Allure auto-deploy to GitHub Pages
- 🏗️ Page Object Model (POM) design pattern for maintainable and scalable tests
- 💡 TypeScript, ESLint, Prettier integration

## 🔧 Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/) (will be installed via `npm install -g typescript`)
- [Playwright](https://playwright.dev/) (installed via `npx playwright install`)
- [Allure Commandline](https://docs.qameta.io/allure/) (optional, only if you want to open reports locally)

To install Allure CLI:

```bash
npm install -g allure-commandline --save-dev
```

## 🧠 Commands

| Command                   | Description                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| `npm run test`            | Run all tests                                                             |
| `npm run test:smoke`      | Run tests tagged with `@smoke`                                            |
| `npm run test:regression` | Run tests tagged with `@regression`                                       |
| `npm run test:critical`   | Run tests tagged with `@critical`                                         |
| `npm run test:tag`        | Run tests dynamically with a specific tag e.g `npm run test:tag "@login"` |
| `npm run test:allure`     | Run tests and generate allure results                                     |
| `npm run allure:generate` | Generate allure report HTML from results                                  |
| `npm run allure:open`     | Open the generated report locally                                         |

## 📄 GitHub Pages Report

🔗 View the latest test report: [Allure Report](https://indrabsudirman.github.io/dealls-challenge-qa-automation/)

## 📝 Usage

There are two ways to run the tests in this project:

### 1. Clone and run locally

```bash
git clone https://github.com/indrabsudirman/dealls-challenge-qa-automation.git
cd dealls-challenge-qa-automation
npm install --legacy-peer-deps
npx playwright install
npm run test # will run all tests or you could follow the commands list above
```

> 💡 Note: Normally, `npx playwright install` is not needed because required browsers are automatically installed during `npm install --legacy-peer-deps`. Only run it manually if you encounter a missing browser error.

You can also run specific tests using tags, such as:

```bash
npm run test:tag "@login"
```

See `.env` file for more configuration options.

### 2. Run via GitHub Actions

You can trigger tests directly from the [**"Actions"**](https://github.com/indrabsudirman/dealls-challenge-qa-automation/actions/workflows/dealls-challenge-qa-automation.yml) tab in GitHub by manually dispatching the workflow and providing the desired tag (e.g., `@smoke`, `@regression`, `@critical`, `@login`).

After execution, the latest Allure report will be automatically deployed and accessible via GitHub Pages:
👉 [View Allure Report](https://indrabsudirman.github.io/dealls-challenge-qa-automation/)
