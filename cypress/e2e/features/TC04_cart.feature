@US04 @TS04 @cart @cartmanagement
Feature: US04 - Cart Management and Control
    As a user
    I want to be able to view the products I add to my shopping cart on a single screen, change product quantities, and remove unwated items from the cart
    So that I have full control over my order,filter or sort products and procceed smoothly with the purchase process

   Background:
    Given I am on the Kitapsepeti "homepage" as a logged-in user
   

  @TC14 @AC16 @Functional @Regression @UI @Navigation
    Scenario: TC14_Accessing the cart via the right navigation and checking price consistency
    When I am on the cart page "/sepet" 
    When I click on the cart icon at the top right corner of the site
    Then the "Cart" right navigation drawer should open
    When I click the "Sepete Git" button on the navigation drawer
    Then I should be redirected to the cart page "/sepet" successfully

  @TC15 @AC17 @AC18 @Functional @Regression @UI
    Scenario: TC15_Verifying product information subtotal, shipping fee and grand total on the cart page
    When I have added a product to the cart
    When I navigate to the cart page "/sepet"
    Then for each product listed on the cart page, product name, unit price, quantity, and total price displayed correctly
    And the "Cart Total" section on the right side of the page should display the cart total,shipping fee and grand total accurately

  @TC16 @AC19 @Functional @Regression @UI
    Scenario: TC16_Increasing product quantity and verifying the updated total price
    When I navigate to the cart page "/sepet"
    When I clear the cart or start with an empty cart
    When I have added a product to the cart
    When I increase the quantity of a product in the cart by clicking the "+" button
    Then the total price for the product and the "Grand Total" should be updated accurately according to the new quantity
 
  @TC17 @AC20 @AC21 @AC22 @Functional @Regression @UI
    Scenario: TC17_Removing products, clearing the cart and verifying the empty cart state
    When I navigate to the cart page "/sepet"
    When I clear the cart or start with an empty cart
    When I have added a product to the cart
    When I deletes products either by clicking the trash can icon and confirming the popup or clicking the "Sepeti Temizle" button and confirming the popup
    Then all specified products should be removed from the cart
    And when no product remain, the page should update to show the massage "Sepetinizde ürün bulunmamaktadır" along with a "Alışverişe Devam Et" button

  @TC18 @AC23 @Functional @Regression @UI
    Scenario: TC18_Proceeding to checkout with a least one item in the cart and verifying the checkout page
    When I have added a product to the cart
    When I am on the cart page with at least one product in the cart
    Then a clickable "Satın Al" button should be present to take me to the next page

  @TC19 @AC24 @AC25 @Functional @Regression @UI
    Scenario Outline: TC19_Accessing the cart from different pages via add to cart popup
    When I click "Sepetim" button 
    And clicks the "Sepete Git" button in the popup
    Then I should be redirected to the cart page "/sepet" successfully  