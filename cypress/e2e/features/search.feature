@US02 @TS02 @Search @Listing
Feature: US02 - Search&Listing
  As a user
  I want to easily find products on the site and filter/sort the results
  So that I can quickly reach the product I want to buy

  Background:
    Given I am on the Kitapsepeti "homepage" as a logged-in user

    @TC06 @AC1 @AC2 @Positive @Smoke @Regression
  Scenario: TC06_Search-Success-Flow: Search Execution and UI Reset
  # Execute a search query with a minimum of 1 character. 
  # Validate successful redirection to the /arama page and confirm that the search input field is cleared [2].
    When I enter "roman" into the search bar
    And I click the search button
    Then I should be redirected to the "/arama" page and see related products listed
    And the search input field should be automatically cleared

    @TC07 @AC3 @Negative @Regression
  Scenario: TC07_Negative-Search-State: Zero-Result Handling
    # Execute a search with non-existent keywords (e.g., "xyzqwert999"). 
    # Assert that the UI correctly displays the "Empty State" with no product cards available.
    When I enter "xyzqwert999" into the search bar
    And I click the search button
    Then I should see zero products on the search results page and an empty state message should be displayed

    @TC08 @AC4 @AC5 @UI @Regression
  Scenario: TC08_Product-Card-Interaction: Visual Integrity and Hover States
    # Verify the integrity of product cards (Image, Title, Publisher, Price). 
    # Assert that the "Add to Cart" button becomes visible only upon hovering over the price area.
    When I perform a search for "history"
    Then each product card should completely display "Ürün Görseli", "Ürün Adı", "Yayınevi" and "Fiyat" details
    When I hover the mouse over the product price area
    Then the "Sepete Ekle" button should become visible and clickable

    @TC09 @AC6 @AC7 @Functional @Regression
  Scenario: TC09_Catalog-Management: Sorting and Filtering Logic
    # Validate sorting menu options and functional filtering accuracy.
    When I perform a search for "history"
    And I click on the "Sıralama" dropdown menu at the top right
    Then I should see "Varsayılan Sıralama", "Yeniden Eskiye", "Eskiden Yeniye", "Fiyat Artan" and "Fiyat Azalan" options in the menu
    When I apply filters for "Kategoriler", "Marka" and "Model" from the left filter panel
    Then the product list should be updated according to the selected filters

    @TC10 @AC8 @AC9 @Usability @Regression
  Scenario: TC10_Nav-and-Lazy-Loading: Category Navigation and Lazy Loading
    # Verify header category navigation and infinite scroll logic.
    When I click on a category from the top navigation on the homepage
    Then I should navigate to the corresponding category page and see the "Menü" sidebar displayed on the left
    When I scroll down to the bottom of the product listing page
    Then more products should be loaded automatically via lazy loading