@US06 @TS06 @guestCheck
Feature: US06 - Guest Checkout Flow
  As a user,
  I want to proceed with the checkout steps as a guest without creating a site membership,
  So that I can complete my order quickly without saving my personal data.

  Background:
    Given I am on the Kitapsepeti "homepage"
    Given I have added a product to the cart
    Given I am on the cart page "/sepet" 
    And click the "Satın Al" button in the popup
    Then I am redirected to the "/siparis-uye-giris" page

@TC25 @AC33
  Scenario: TC25_Display Guest Checkout option
    Then a prominent "Üye Olmadan Devam Et" button should be present

@TC26 @AC34
  Scenario: TC26_Load Address Form upon selecting guest checkout
    When I click the "Üye olmadan Devam Et" button on the cart page
    Then the address form page titled "Adres Bilgileri" should load

@TC27 @AC35
  Scenario: TC27_Address form fields presence
    When I have navigated to the address form page
    Then the form must contain "Ad Soyad", "E-posta", "Cep Telefonu", "il", "İlçe", "Mahalle", and "Adres" fields

@TC28 @AC36
  Scenario: TC28_Negative validation for mandatory form fields
    When I have navigated to the address form page
    When I leave a mandatory field blank and click the "Adresi Kaydet" button
    Then a red warning message "Lütfen Bu Alanı Doldurunuz" should be displayed inside the relevant field

@TC29 @AC37
  Scenario: TC29_Successful form submission and progression
    When I have navigated to the address form page
    When I fill in all mandatory fields with valid information and click the "Adresi Kaydet" button
    Then I should successfully proceed to the payment options step