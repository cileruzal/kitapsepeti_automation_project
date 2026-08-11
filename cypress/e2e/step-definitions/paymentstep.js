import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pages/LoginPage";
import searchPage from "../../pages/SearchPage";
import productPage from "../../pages/ProductPage";
import cartPage from "../../pages/CartPage";
import paymentPage from "../../pages/PaymentPage";


// ==========================================
// BACKGROUND STEPS
// ==========================================

Given("I am on the cart page and clicks the {string} button to be redirected to the {string} page" ,() => {


cartPage.navigateToCart();  // search.step deki Given kısmını karşılıyor. user login yapıyor.
cy.loginViaApi();
cartPage.addProductAndGoToCartDirectly();
cartPage.clickPopupGoToCartButton();
paymentPage.clickBuyButton();
paymentPage.displayAdress();

})

Given("I click the {string} button to be redirected to the payment details screen",() => {
    paymentPage.clickProceedToPaymentButton()
});


// ==========================================
// TC20 STEP DEFINITIONS
// ==========================================


Then("I should see {string} and {string} as cargo options",() => {
    paymentPage.cargoSection()
});


Then("{string} should be selected by default",() => {
    paymentPage.cargoSectionForPTT()
});

// ==========================================
// TC21 STEP DEFINITIONS
// ==========================================


Then("{string} and {string} options should be clearly presented on the payment page",()=> {
    paymentPage.verifyPaymentSections()
});


Then("I select the {string} option",()=> {
    paymentPage.clickToCreditCardButton()
});

Then("Name on Card, Card Number, Expiration Date, and CVV fields should be displayed",()=> {
    paymentPage.verifyCreditCardFormInfo()
});

// ==========================================
// TC22 STEP DEFINITIONS
// ==========================================

Then("All mandatory card and address details are completely filled out",()=> {
    paymentPage.fillCreditCardForm()
});

Then("The {string} button should become active and blue",()=> {
    paymentPage.verifyPayButtonIsEnabled()
});


// ==========================================
// TC23 STEP DEFINITIONS
// ==========================================

Then("Some fields are left blank and the {string} button is clicked",()=> {
    paymentPage.clickPayButton()
});


Then("A red warning message stating {string} should be displayed under the text fields",()=> {
    paymentPage._getEmptyFieldError()

});

// ==========================================
// TC24 STEP DEFINITIONS
// ==========================================


Then("A final {string} box should be located on the right side of the page showing the correct grand total amount",()=> {
    paymentPage.verifyOrderSummary()
});

