@US05 @TS05 @payment @order @regression
Feature: US05 - Payment and Order Confirmation
  As a user who has entered address details, 
  I want to select one of the different payment methods, 
  view the final summary of my order, and approve the legal agreements to complete the order.

  Background:
    Given I am on the Kitapsepeti "homepage" as a logged-in user
    Given I am on the cart page and clicks the "Satın Al" button to be redirected to the "Adres Bilgisi" page 
    Given I click the "Ödeme Adımına Geç" button to be redirected to the payment details screen

  @TC20 @AC26 @AC27 @Functional @Regression @UI @PaymentDetails @CargoOptions
  Scenario: TC20_Navigation to Payment Details Step and Cargo Options Control
    Then I should see "PTT Kargo" and "Hepsijet" as cargo options
    And "PTT Cargo" should be selected by default

  @TC21 @AC28 @AC29 @Functional @Regression
  Scenario: TC21_Card Payment Form and Field Verification
    And "iyzico ile Öde" and "Kartla Ödeme" options should be clearly presented on the payment page
    And I select the "Kartla Ödeme" option
    Then Name on Card, Card Number, Expiration Date, and CVV fields should be displayed

  @TC22 @AC30
  Scenario: TC22_Positive - Payment Button Becomes Active When All Fields Are Filled
    And I select the "Kartla Ödeme" option
    And All mandatory card and address details are completely filled out
    Then The "xxx TL Öde" button should become active and blue

  @TC23 @AC31
  Scenario: TC23_Negative - Warning Received When Trying to Pay with Missing Fields
    And I select the "Kartla Ödeme" option
    And Some fields are left blank and the "xxx TL Öde" button is clicked
    Then A red warning message stating "Lütfen Tüm Alanları Doldurunuz" should be displayed under the text fields

  @TC24 @AC32
  Scenario: TC24_Order Summary and Safe Automation Control
    Then A final "Sipariş Özet" box should be located on the right side of the page showing the correct grand total amount
