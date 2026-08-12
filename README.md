# 📚 Kitapsepeti.com E-Commerce QA Automation Project

This repository contains an advanced End-to-End (E2E) test automation framework built for the **Kitapsepeti.com** e-commerce platform using **Cypress** and the **Page Object Model (POM)** architectural design pattern.

---

## 💡 Project Overview

The primary goal of this project is to ensure the stability, reliability, and seamless user experience of core e-commerce functionalities on a live production environment.

* **👤 Authentication & Login:** Positive and negative validation of user credentials.
* **🔍 Search & Filtering:** Product search accuracy, listing integrity, and UI reset logic.
* **🛍️ Product Details & Cart Management:** Adding products, updating quantities, and clearing items.
* **💳 Payment & Order Summary:** Validating dynamic subtotal/cargo totals, error messages, and payment methods.
* **🛒 Guest Checkout:** Smooth purchasing flows without prior registration.

---

## 🛠️ Tech Stack & Architecture

* **Test Framework:** Cypress (v13+)
* **Language:** JavaScript (ES6+)
* **Design Pattern:** Page Object Model (POM)
* **Methodology:** Behavior-Driven Development (BDD) / Cucumber feature files
* **CI/CD Integration:** GitHub Actions
* **Reporting:** Mochawesome (Comprehensive HTML reports)

You can view the live Mochawesome HTML test execution report via the link below:
👉 [View Live Test Report](https://<cileruzal>.github.io/<kitapsepeti_automation_project>/cypress/reports/index_001.html)
---

## 📁 Project Structure

```text
KITAPSEPETI_OTOMASYON/
├── cypress/
│   ├── downloads/              # Downloaded artifacts
│   ├── e2e/                    # Gherkin feature files and step definitions
│   ├── fixtures/               # Test data and mock JSON files
│   ├── reports/                # Generated Mochawesome reports
│   ├── screenshots/            # Automatic failure screenshots
│   └── support/                # Custom commands and global hooks
├── pages/                      # Page Object classes (Locators and actions)
├── package.json                # Project dependencies and CLI scripts
└── README.md                   # Project documentation
