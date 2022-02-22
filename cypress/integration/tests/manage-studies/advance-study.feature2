@advance-study
@manage-studies
Feature: Advance Study
    In order to perform breeding activities
    As a user
    I should be able to advance a study

Background: 
    Given I am on the Manage Studies page of specified program
    And I created a new study in RCBD design with traits

@ignore
@TestCaseKey=IBP-T607  
@smoke-test
Scenario: Advance study with all lines selected using non-bulking breeding method
    When I advance all lines selected using non-bulking breeding method
    And I save the advanced list
    Then a message saying list data was saved successfully should display
    And I will see crossess and selections tab with the advanced lines
    
@ignore    
@TestCaseKey=IBP-T407
Scenario: Advance study with all plots selected using bulking breeding method
    When I advance all plots selected using bulking breeding method
    And I save the advanced list
    Then a message saying list data was saved successfully should display
    And I will see crossess and selections tab with the advanced lines

@ignore    
@TestCaseKey=IBP-T409
Scenario: Advance study using selection variate to select lines and different breeding methods
    When I advance using selection variate to select lines and different breeding methods
    And I save the advanced list
    Then a message saying list data was saved successfully should display
    And I will see crossess and selections tab with the advanced lines