@create-role
@account-management
Feature: Create Role

@TestCaseKey=IBP-T76
@smoke-test
Scenario: Check if user can create new program role in Site Admin
    Given I am already logged in to BMS
    And I navigate to Site Admin page
    When I create a new Program role with valid details
    And I select all available permissions
    Then A message should display that the Program role is successfully saved

@TestCaseKey=IBP-T1975
@smoke-test
Scenario: Verify creation of new role - full instance permissions
    Given I am already logged in to BMS
    And I navigate to Site Admin page
    When I create a new Instance role with valid details
    And I select all available permissions
    Then A message should display that the Instance role is successfully saved

@TestCaseKey=IBP-T1976
@smoke-test
Scenario: Verify creation of new role - full crop permissions
    Given I am already logged in to BMS
    And I navigate to Site Admin page
    When I create a new Crop role with valid details
    And I select all available permissions
    Then A message should display that the Crop role is successfully saved
