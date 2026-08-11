@US03 @TS03
Feature: US03 - Product Detail Page Viewing and Add to Cart  
    As a user
    I want to examine the details of a product I selected from the list (description, features, etc.) 
    And add the product to my shopping cart from this page
    So that I can clearly my purchase decision and proceed to checkout with the selected product

    Background: 
        Given I am on the Kitapsepeti "homepage" as a logged-in user
        When I enter "nutuk" into the search bar
        And I click the search button
        Then I should be redirected to the "/arama" page and see related products listed

    @TC11 @AC10 @Functional @Regression @Smoke
    Scenario: TC11_Product-Detail-Navigation: Redirecting to Product Details via Image or Title
    When I click on the first product's image or title from the search results
    Then I should be redirected to the product detail page successfully

    @TC12 @AC11 @AC12 @Functional @Regression
    Scenario: TC12_Product-Detail-Information-Integrity: Essential Info and Specifications
    When I navigate to the product detail page
    Then I should see the product's detailed information including "Ürün Adı", "Yazar", "Yayınevi" and "Fiyat Bilgileri"
    And the product information section should contain "Türü", "ISBN", "Sayfa Sayısı", "Kağıt Tipi", "Basım Yılı" 
    
    @TC13 @AC13 @AC14 @AC15 @Functional @Regression
    Scenario: TC13_Product-Detail-Add-To-Cart-Flow: Button Functionality, Success Popup and Cart Update
    When I navigate to any product detail page
    Then I should see a functional "Sepete Ekle" button located below the price
    Then an success message popup stating "Ürün başarıyla sepete eklendi" should be displayed
    And the popup should contain "Sepete Git" and "Satın Al" buttons
    And the product count on the cart icon at the top right corner of the site should increase by "1"

