@import-crosses
@manage-studies
Feature: Create Crosses
    In order to perform breeding activities
    As a user
    I should be able to create crosses

Background: 
    Given I am on the Manage Studies page of specified program
    When I created a new study with basic details
    And I browsed germplasm list 
    And I generated experimental design using Randomized Complete Block design
    And Design generation is successful
    Then I should be directed back to the study

@TestCaseKey=IBP-T524
@smoke-test
Scenario: Check if user can export crossing template and import crosses using 'Use automatic name generation' option
    When I export a crossing template
    And I import a crossing template with details
    And I select automatic naming generation
    And And I save the cross list
    Then a message saying that list data is saved successfully should display
    
@TestCaseKey=IBP-T523
@smoke-test
Scenario: Check if user can import polycrosses using 'Specify name format' option
   When I import a crossing template with details
   And I specified naming format
   And I save the cross list
   Then a message saying that list data is saved successfully should display

