Feature: Login
    Feature Login page will work depending on the user credentials.


    Scenario: 1- Login with valid credentials and correct OTP
        Given I go to mazaady Website
        When  I Enter My Mail "Email:test22@gmail.com"
        And I Enter My Password "123456789"
        And I click on Login button
