@reset-password
@account-management
Feature: Reset Password
    In order to login to BMS when I have forgotten my password
    As a user
    I need to reset my password

@TestCaseKey=IBP-T77
@smoke-test
  Scenario: Check if user can reset password
  	Given I navigate to the Reset Password page
    When I enter my email addresss and username
    And I click Continue
    Then A message saying that a link was sent to my email should display