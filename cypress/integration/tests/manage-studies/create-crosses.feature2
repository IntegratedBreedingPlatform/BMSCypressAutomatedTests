@create-crosses
@manage-studies
Feature: Create Crosses
    In order to perform breeding activities
    As a user
    I should be able to create crosses

Background: 
    Given I am on the Manage Studies page of specified program
    And I opened a study with RCBD design

@ignore
@TestCaseKey=IBP-T522
@smoke-test
Scenario: Check if user can create crosses with unknown male parents using 'Use automatic name generation' option
   When I navigated to design crosses page
   And I added entries to female list
   And I generated crosses with unknown male parents
   And I selected automatic naming generation
   And I save the cross list
   Then a message saying that list data is saved successfully should display

@ignore
@TestCaseKey=IBP-T521
@smoke-test
Scenario: Check if user can create polycrosses using 'Specify name format' option
   When I navigated to design crosses page
   And I added entries to female list
   And I added entries to male list
   And I generated crosses for each female with all male parents
   And I specified naming format
   And I save the cross list
   Then a message saying that list data is saved successfully should display


