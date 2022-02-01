@create-user
@account-management
Feature: Create User

@TestCaseKey=IBP-T76
@smoke-test
Scenario: Check if user can create new user and assigned the created role in Site Admin
    Given I am already logged in to BMS
    And I navigate to Site Admin page
    When I create a new user with valid details
    And I assign an the created program role to the user
    And I add the new user
    Then I should see that the created user in the list
