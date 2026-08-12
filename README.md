📚 Kitapsepeti.com E-Commerce QA Automation Project 🚀
This repository contains an advanced End-to-End (E2E) test automation framework built for the Kitapsepeti.com e-commerce platform using Cypress and the Page Object Model (POM) architectural design pattern.

💡 Project Overview 
The primary goal of this project is to ensure the stability, reliability, and seamless user experience of core e-commerce functionalities on a live production environment. Both positive and negative test scenarios are implemented while utilizing safe, mock-driven validation techniques without executing actual financial charges.
👤 Authentication & Login: Positive and negative validation of user credentials.
🔍 Search & Filtering: Product search accuracy, listing integrity, and UI reset logic.
🛍️ Product Details & Cart Management: Adding products, updating quantities, and clearing items.
💳 Payment & Order Summary: Validating dynamic subtotal/cargo/grand totals, checking form error messages, and testing payment method states (e.g., Kartla Ödeme vs. iyzico ile Öde).
🛒 Guest Checkout: Smooth purchasing flows without prior registration.
🛠️ Tech Stack & Architecture / Kullanılan Teknolojiler
Test Framework: Cypress (v13+)
Language: JavaScript (ES6+)
Design Pattern: Page Object Model (POM) for maximum maintainability and modularity.
Methodology: Behavior-Driven Development (BDD) / Cucumber feature files.
CI/CD Integration: GitHub Actions (Automated pipeline execution on every push/PR).
Reporting: Mochawesome (Comprehensive, merged HTML reports with embedded screenshots and error logs).
📁 Project Structure / Proje Dosya Yapısı
Plaintext
KITAPSEPETI_OTOMASYON/
├── cypress/
│   ├── downloads/              # Downloaded artifacts during test execution
│   ├── e2e/                    # Gherkin feature files and step definitions
│   ├── fixtures/               # Test data and mock JSON files
│   ├── reports/                # Generated Mochawesome HTML and JSON test reports
│   ├── screenshots/            # Automatic failure screenshots
│   └── support/                # Custom commands, global hooks (beforeEach), and configurations
├── pages/                      # Page Object classes (UI locators and reusable action methods)
├── package.json                # Project dependencies and custom CLI scripts
└── README.md                   # Project documentation
⚙️ Setup and Execution / Kurulum ve Çalıştırma
Make sure you have Node.js installed on your machine, then follow these steps:
Clone the repository:
Bash
git clone https://github.com/cileruzal/kitapsepeti_automation_project.git
cd kitapsepeti-cypress-e2e
Install dependencies:
Bash
npm install
Run tests via CLI (Headless mode):
Bash
# Example individual execution scripts
npm run test:login
npm run test:search
Generate and Merge HTML Reports:
Bash
npm run report:all
Open Cypress Test Runner (Interactive UI Mode):
Bash
npx cypress open
📊 CI/CD & Test Reporting / Raporlama ve Otomasyon
The project is fully integrated with GitHub Actions. Every push or pull_request triggers automated test runs across environments.
Artifacts Management: Failed test screenshots, execution videos, and Mochawesome HTML reports are safely archived in GitHub Actions.
Unified Reporting: Test results combine detailed scenario descriptions, pass/fail status metrics, execution durations, and step-by-step logs.
📚 Documentation & Links / Proje Dokümantasyonları
📄 User Story Criteria: Detailed breakdown of platform requirements.
📄 Test Scenarios: Comprehensive test cases mapped against Acceptance Criteria.
🔗 HTML Test Reports: Visual proof of successful test executions generated via Mochawesome.
