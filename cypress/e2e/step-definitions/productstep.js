import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pages/LoginPage";
import searchPage from "../../pages/SearchPage";
import productPage from "../../pages/ProductPage";

// ==========================================
// BACKGROUND STEPS
// ==========================================

// from the background steps, we can directly use the existing step definitions from the login and search page step definitions files, so we don't need to redefine them here.

// ==========================================
// TC11 STEP DEFINITIONS 
// ==========================================

When("I click on the first product's image or title from the search results", () => {
  searchPage._getProductCards().first().find('.product-title, a').first().click({ force: true });
});


Then("I should be redirected to the product detail page successfully", () => {
  productPage.verifyProductPage();
});

// ==========================================
// TC12 STEP DEFINITIONS 
// ==========================================

When("I navigate to the product detail page", () => {
  // Arama sonuçlarındaki ilk karta tıkla
  searchPage._getProductCards().first().find('.product-title').first().click({ force: true });
    productPage.verifyProductPage();
});

Then("I should see the product's detailed information including {string}, {string}, {string} and {string}", (productTitle, productAuthor, productPublisher, productPrice) => {
  productPage.verifyProductBasicInfo();
});

//ürün ismine göre Hakkındaki Bilgiler kısmına ürünün adı geliyor.
//visibility:hidden takılı kaldığı için step kısmında cy.get komut kullandım. 
Then("the product information section should contain {string}, {string}, {string}, {string}, {string}", (productType, isbn, pageCount, paperType, publicationYear) => {
    cy.get('table, .info-title, .tab-content').should('be.visible');
    cy.get('body').should('contain', productType);
    cy.get('body').should('contain', isbn);
    cy.get('body').should('contain', pageCount);
    cy.get('body').should('contain', paperType);
    cy.get('body').should('contain', publicationYear);
});

// ==========================================
// TC13 STEP DEFINITIONS (Add to Cart Flow)
// ==========================================

When ("I navigate to any product detail page", () => {
  searchPage._getProductCards().first().find('.product-title').first().click({ force: true });
  productPage.verifyProductPage();
})

Then("I should see a functional \"Sepete Ekle\" button located below the price", () => {
  productPage.clickAddToCartButton(); // Veya sadece görünürlük kontrolü için uygun metot eklenebilir
});

Then("an success message popup stating \"Ürün başarıyla sepete eklendi\" should be displayed", () => {
  productPage.verifySuccessfulAddToCartMessage();
});

Then("the popup should contain \"Sepete Git\" and \"Satın Al\" buttons", () => {
  productPage.clickGoToCartButton();
  
   // Test akışına göre tıklama veya görünürlük doğrulaması
});

Then("the product count on the cart icon at the top right corner of the site should increase by {string}", (countStr) => {
  const expectedCount = parseInt(countStr, 10);
  productPage.verifyCartIconCount(expectedCount);
  productPage.verifyQuantity();
});