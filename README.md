# To-Do Application Test Automation Framework

This repository contains an Enterprise-level End-to-End (E2E) UI test automation framework built for a **To-Do Application**. The framework leverages **Playwright** with **TypeScript** and adheres strictly to modern software engineering patterns.

---

## 🛠️ Tech Stack & Tools

* **Core Framework**: Playwright (Web-First Assertions, Auto-waiting, Native Tracing)
* **Language**: TypeScript (Strict Typing, Interface Contracts)
* **Architecture Pattern**: Component Object Model (COM) & Page Object Model (POM) via **Atomic Design**
* **Test Data Generation**: @faker-js/faker
* **Code Quality & Styling**: ESLint (v8.57.1) & Prettier
* **CI/CD Integration**: GitHub Actions

---

## 📐 Architecture & Design Patterns

### 🧬 Atomic Design (Component Object Model)
To maximize code reusability and eliminate fragile selectors, the framework splits UI components into distinct structural levels:

1. **Atoms (`POMs/atoms/`)**: The smallest, immutable UI building blocks.
    * `Button.ts` - Encapsulates click actions and element states (enabled/disabled/visible).
    * `Input.ts` - Wraps text fields, data filling, typing simulations, and value assertions.
2. **Organisms (`POMs/organisms/`)**: Complex UI structures composed of atoms and raw locators.
    * `ToDoItem.ts` - Manages a singular task card component (contains checkboxes, labels, and the delete `Button` atom).
3. **Pages (`POMs/pages/`)**: Full-screen layouts composed of organisms and atoms.
    * `ToDoPage.ts` - Aggregates the text entry `Input` atom, footer filter `Button` atoms, and dynamic methods to fetch `ToDoItem` organisms.

### 🛡️ Flake-Resistant Selectors & Dynamic Elements
* **Lazy Locators**: Leverages Playwright's lazy evaluation strategy to retain reference integrity during DOM re-renders.
* **Text-Based Indexing**: Replaced rigid array indexing (`nth(x)`) with dynamic text-based querying (`getToDoItemByText`) to maintain stable test executions when elements shift, collapse, or drop out of view during filtering actions.
* **Global Environments**: Configured centralized `baseURL` parameter handling inside `playwright.config.ts` to effortlessly decouple test scripts from explicit domain environments.

---

## 🧪 Test Coverage

The suite validates critical user journeys across the application:
* **Creation Flows**: Validates standard item creation and bulk item generation using localized mock data.
* **State Mutations**: Verifies complete workflow toggling (marking tasks as Active/Completed).
* **Deletions**: Assures item eviction via single item deletion and systemic cleanup using the `Clear completed` trigger.
* **Systemic Filtering**: Validates visual constraints and dataset mutations across **All**, **Active**, and **Completed** routing filters.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (LTS version recommended)
* npm (bundled with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/lijaellermaa/to-do-app.git
   cd to-do-app
   ```
2. Install all development dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Execution Scripts

* **Run all tests** (Headless mode across Chromium, Firefox, WebKit):
  ```bash
  npm run test
  ```
* **Run tests via Playwright UI Mode** (Interactive debugging):
  ```bash
  npx playwright test --ui
  ```
* **Code Quality Verification (Linting)**:
  ```bash
  npm run lint
  ```
* **Code Formatting (Prettier)**:
  ```bash
  npm run format
  ```

---

## 🤖 Continuous Integration (CI/CD)

The project includes a fully production-ready **GitHub Actions** pipeline configured via `.github/workflows/playwright.yml`.

### Pipeline Execution Lifecycle:
1. **Environment Setup**: Provisions an Ubuntu runner and configures an optimized Node.js caching environment.
2. **Static Code Analysis**: Runs `npm run lint` and `npm run check` to verify structure, formatting, and syntax before initializing heavy tasks.
3. **Browser Provisioning**: Automatically installs the strict system dependencies and isolated binaries required for Playwright.
4. **Parallel Test Protests**: Executes the complete test matrix simultaneously across multiple worker threads.
5. **Artifact Retention**: Packages and uploads comprehensive `playwright-report/` logs for analytical debugging of failures or regressions.
