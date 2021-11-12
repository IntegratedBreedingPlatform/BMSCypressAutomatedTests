@create-role
@account-management
Feature: Create Role

@ignore
@TestCaseKey=IBP-T76
@smoke-test
Scenario: Check if user can create new program role in Site Admin
    Given I am already logged in to BMS
    And I navigate to Site Admin page
    When I create a new program role with valid details
    And I select all available permissions
    Then A message should display that the role is successfully saved
    # NOTE: Assert success message and if role is present in the list

@ignore
@TestCaseKey=IBP-T1975
Scenario: Verify creation of new role - full instance permissions
    Given I am already logged in to BMS
    And I navigate to Site Admin page
    When I create a new instance role with valid details
    And I select all available permissions
    Then A message should display that the role is successfully saved
    # NOTE: Assert success message and if role is present in the list

@ignore
@TestCaseKey=IBP-T1976
Scenario: Verify creation of new role - full crop permissions
    Given I am already logged in to BMS
    And I navigate to Site Admin page
    When I create a new crop role with valid details
    And I select all available permissions
    Then A message should display that the role is successfully saved
    # NOTE: Assert success message and if role is present in the list