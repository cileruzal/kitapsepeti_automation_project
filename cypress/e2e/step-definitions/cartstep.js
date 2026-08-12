import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pages/LoginPage";
import productPage from "../../pages/ProductPage";
import cartPage from "../../pages/CartPage";
import SearchPage from "../../pages/SearchPage";

// ==========================================
// BACKGROUND STEPS
// ==========================================

Given("I clear the cart or start with an empty cart", () => {
    cartPage.clearAllCart();
});

//==========================================
// TC14 STEP DEFINITIONS
// ==========================================

When("I am on the cart page {string}", (pageName) => {
    cartPage.navigateToCart();
}); 

When("I click on the cart icon at the top right corner of the site", () => {
    cartPage.clickGoToCartButton();
});

Then("the {string} right navigation drawer should open", () => {
    cartPage.openCart();
});

When("I click the {string} button on the navigation drawer", () => {
    cartPage.clickPopupGoToCartButton();
});

Then("I should be redirected to the cart page {string} successfully", (pageName) => {
    cartPage.verifyCartURL();
});

// ==========================================
// TC15 STEP DEFINITIONS
// ==========================================

When ("I have added a product to the cart", () => {
    cartPage.addProductAndGoToCartDirectly();
});

When("I navigate to the cart page {string}", (pageName) => {
    cartPage.goToCartPage();
});

Then("for each product listed on the cart page, product name, unit price, quantity, and total price displayed correctly", () => {
    cartPage.displayCartDetails();
});

Then("the {string} section on the right side of the page should display the cart total,shipping fee and grand total accurately", (sectionName) => {
    cartPage.verifyGeneralTotal();
});

// ==========================================
// TC16 STEP DEFINITIONS
// ==========================================

When("I increase the quantity of a product in the cart by clicking the {string} button", (button) => {
    cartPage.increaseProductQuantity(button);
});

Then("the total price for the product and the {string} should be updated accurately according to the new quantity", () => {
    cartPage.verifyQuantity()
});


// ==========================================
// TC17 STEP DEFINITIONS
// ==========================================

When('I deletes products either by clicking the trash can icon and confirming the popup or clicking the {string} button and confirming the popup', () => {
  cartPage.clearCartViaButton();
  // Veya çöp kutusu ile silmek için:
  // CartPage.deleteProductViaTrashIcon();
});

Then('all specified products should be removed from the cart', () => {
  // Ürünün sepetten kalktığını kontrol et
  cy.get('.cart-item').should('not.exist');
});

Then('when no product remain, the page should update to show the massage {string} along with a {string} button', () => {
  cartPage.verifyEmptyCartState();
});

// ==========================================
// TC18 STEP DEFINITIONS
// ==========================================

When('I am on the cart page with at least one product in the cart', () => {
  cartPage.navigateToCart();
  cartPage.verifyCartURL();
  cy.get('.cart-item').should('be.visible'); // Sepette en az bir ürün olduğunu doğrular
});

Then('a clickable {string} button should be present to take me to the next page', () => {
  cartPage.verifyCheckoutButtonIsPresentAndClickable();

});


// ==========================================
// TC19 STEP DEFINITIONS
// ==========================================

When('I click {string} button', (button) => {
    cartPage.navigateToCart();
});



Then('clicks the {string} button in the popup',  () => {
    cartPage.clickPopupGoToCartButton();
});

