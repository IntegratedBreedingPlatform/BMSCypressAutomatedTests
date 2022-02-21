@import-crosses
@manage-studies
Feature: Import Crosses
    In order to perform breeding activities
    As a user
    I should be able to create crosses

Background: 
    Given I am on the Manage Studies page of specified program
    And I opened a study with RCBD design

@TestCaseKey=IBP-T524
@smoke-test
Scenario: Check if user can export crossing template and import crosses using 'Use automatic name generation' option
    When I export a crossing template
    And I click Import Crosses action from Crossing options
    And I import a crossing template with details
    And I select automatic naming generation
    And And I save the cross list
    Then a message saying that list data is saved successfully should display
    
@TestCaseKey=IBP-T523
@smoke-test
Scenario: Check if user can import polycrosses using 'Specify name format' option
    When I export a crossing template
    And I click Import Crosses action from Crossing options
    And I import a crossing template with details
    And I specified naming format
    And And I save the cross list
    Then a message saying that list data is saved successfully should display

