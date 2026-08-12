@US01 @TS01 @Authentication @Login
Feature: US01 - User Login
  As a registered user
  I want to login to Kitapsepeti.com with my email and password
  So that I can access my profile and order history safely

Background:
    Given I am on the Kitapsepeti "homepage"

    @TC01 @AC01 @AC02 @Smoke @Regression @UI
    Scenario: TC01 - Verify that the login page Popup UI and Functional Elements
        When I click on the "E-posta ile giriş" link or avatar icon in the header
        Then I should see the login popup with the following elements:
            | Element                  | Expected Result                       |
            |--------------------------|---------------------------------------|
            | E-posta giriş alanı      | Should be present and enabled         |
            | Şifre giriş alanı        | Should be present and enabled         |
            | Beni Hatırla checkbox    | Should be present and enabled         |
            | Giriş Yap butonu         | Should be present and enabled         |
            | Kayıt ol butonu          | Should be present and clickable       |

    @TC02 @AC03 @AC04 @Smoke @Regression @UI @Critical @positive @Functional 
    Scenario: TC02 - Verify that the user can login with valid credentials
        When I click on the "E-posta ile giriş" link or avatar icon in the header
        And I enter valid email and password in the login popup
        And I click the "Giriş Yap" button
        Then I should see the "Hesabım" icon in the header to confirm successful login

  #  @TC03 @AC05 @Regression @Negative
  #  Scenario Outline: TC03 - Verify login with invalid credentials or wrong password
  #      When I click on the "E-posta ile giriş" link or avatar icon in the header
  #      And I enter email "<email>" and password "<password>" in the login popup
  #      And I click the "Giriş Yap" button
  #      Then I should see the "<errorMessage>"

   #     Examples:
    #    | email             | password     | errorMessage              |
    #    | wrong@test.com    | 123456       | Giriş bilgileriniz hatalı |
    #    | valid@test.com    | wrongpass    | Giriş bilgileriniz hatalı |
    #    | invalid_format    | 123456       | Giriş bilgileriniz hatalı |
    #    |                   |              | Giriş bilgileriniz hatalı |

  #   @TC04 @AC8 @Negative @Regression @Security @API @Ignore
  # Scenario: TC04_Account-Lockout-Policy: Account Lockout after Multiple Failed Attempts
  # Security & Rate Limiting: Assert that the system triggers a 30-minute lockout and displays the message "Çok fazla istek talebinde bulundunuz" after 10 consecutive failed login attempts. 
  #    (NOTE: Backend test required / Mocking)
  #  When I perform 10 consecutive failed login attempts
  #  Then I should see the message "Çok fazla istek talebinde bulundunuz"
  #  And the account should be locked for 30 minutes

 #   @TC05 @AC9 @Regression @Usability @UI
 #   Scenario: TC05_Login-Forgot-Password: Verify Forgot Password Redirection
 #    Forgot Password UI and Workflow Redirection: Verify that clicking "Forgot Password" redirects to the reset page. 
 #    Assert the visibility of the "Remind Password" (Şifremi Hatırlat) CTA and the corresponding Email input field.
 #   When I click on the login icon in the header
 #   And I click on the "Şifremi Unuttum" link
 #   Then I should see the password recovery form
 #   And the "Şifremi Hatırlat" CTA should be visible