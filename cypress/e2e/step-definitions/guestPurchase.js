import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pages/LoginPage";
import searchPage from "../../pages/SearchPage";
import productPage from "../../pages/ProductPage";
import cartPage from "../../pages/CartPage";
import paymentPage from "../../pages/PaymentPage";
import guestPurchasePage from "../../pages/guestPurchasePage"

// ==========================================
// BACKGROUND STEPS
// ==========================================

Then ("click the {string} button in the popup",()=> {
    paymentPage.clickBuyButton()
});

Then ("I am redirected to the {string} page",()=> {
    guestPurchasePage.verifyRedirectToOrderLoginPage()
});

// ==========================================
// TC25 STEP DEFINITIONS
// ==========================================

Then ("a prominent {string} button should be present",()=> {
    guestPurchasePage.verifyContinueAsGuestButtonVisible()
});

// ==========================================
// TC26 STEP DEFINITIONS
// ==========================================

When("I click the {string} button on the cart page",()=> {
    guestPurchasePage.clickContinueAsGuestButton()
});

Then ("the address form page titled {string} should load",()=> {
    guestPurchasePage.verifyAdressFormPage()
});

// ==========================================
// TC27 STEP DEFINITIONS
// ==========================================

When ("I have navigated to the address form page",()=> {
    // Adres sayfasına gelebilmek için butona tekrar tıklama akışını tetikliyoruz:
    guestPurchasePage._getContinueAsGuestButton().click({ force: true });
    guestPurchasePage.verifyAdressFormPage();
});

Then ("the form must contain {string}, {string}, {string}, {string}, {string}, {string}, and {string} fields",()=> {
    guestPurchasePage.verifyAdressFormInput();
});

// ==========================================
// TC28 STEP DEFINITIONS
// ==========================================

When ("I leave a mandatory field blank and click the {string} button", ()=> {
    guestPurchasePage.clickSaveAdressButton();
});

Then ("a red warning message {string} should be displayed inside the relevant field", ()=> {
    guestPurchasePage.verifyRedErrorMessage();
});

// ==========================================
// TC29 STEP DEFINITIONS
// ==========================================

When ("I fill in all mandatory fields with valid information and click the {string} button", ()=> {
cy.fixture("testdata").then((data) => {
    guestPurchasePage.fillAdressForm(data.address);
});});

Then ("I should successfully proceed to the payment options step", ()=> {
    cy.url().should("include", paymentPage.paymentPageUrl.payment);
});