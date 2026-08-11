import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import searchPage from "../../pages/SearchPage"; 
import loginPage from "../../pages/LoginPage"; 

// ==========================================
// BACKGROUND STEPS
// ==========================================

Given("I am on the Kitapsepeti {string} as a logged-in user", (pageName) => {
  loginPage.visit("homepage");
  loginPage.openLoginPopup();
  loginPage.fillValidCredentials();
  loginPage.submit();
  loginPage.verifyLoggedIn();

  searchPage.verifySearchInput(); 
});

// ==========================================
// TC06 STEP DEFINITIONS
// ==========================================

When("I enter {string} into the search bar", (keyword) => {
  searchPage.fillSearchInput(keyword);
});

When("I click the search button", () => {
  searchPage.submitSearch();
});

Then("I should be redirected to the {string} page and see related products listed", (pagePath) => {
  cy.url().should('include', pagePath);
  searchPage.verifySearchResults();
});

Then("the search input field should be automatically cleared", () => {
  searchPage.verifySearchInputCleared();
});

// ==========================================
// TC07 STEP DEFINITIONS
// ==========================================

Then("I should see zero products on the search results page and an empty state message should be displayed", () => {
  searchPage.verifyNoProductCardsDisplayed();
});

// ==========================================
// TC08 STEP DEFINITIONS
// ==========================================

When("I perform a search for {string}", (product) => {
  searchPage.fillSearchInput(product);
  searchPage.submitSearch();
});

Then('each product card should completely display {string}, {string}, {string} and {string} details', () => {
  searchPage.verifyProductCardIntegrity();
});

When("I hover the mouse over the product price area", () => {
    searchPage.hoverProductPrice();
});

Then('the {string} button should become visible and clickable', (buttonName) => {
  searchPage.verifyAddToCartButtonState();
});

// ==========================================
// TC09 STEP DEFINITIONS (DÜZELTİLDİ)
// ==========================================

When('I click on the {string} dropdown menu at the top right', (menuName) => {
  searchPage.openSortingDropdown();
});

// Feature dosyasında 5 seçenek var, step tanımı buna göre 5 parametre alacak şekilde güncellendi
Then("I should see {string}, {string}, {string}, {string} and {string} options in the menu", (opt1, opt2, opt3, opt4, opt5) => {
  searchPage.verifySortingMenuOptions();
});

When("I apply filters for {string}, {string} and {string} from the left filter panel", (cat, brand, model) => {
  searchPage.applyCategoryFilters();
});

Then("the product list should be updated according to the selected filters", () => {
  searchPage.verifyFilteredResults();
});

// ==========================================
// TC10 STEP DEFINITIONS (DÜZELTİLDİ)
// ==========================================

When("I click on a category from the top navigation on the homepage", () => {
  searchPage.clickHeaderCategory();
});


Then("I should navigate to the corresponding category page and see the {string} sidebar displayed on the left", (menuText) => {
  searchPage.verifyMenuSidebar();
});

When("I scroll down to the bottom of the product listing page", () => {
  cy.scrollTo('bottom');
});

Then("more products should be loaded automatically via lazy loading", () => {
  searchPage.verifyLazyLoadingActive();
});