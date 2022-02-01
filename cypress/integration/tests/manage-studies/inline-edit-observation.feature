@inline-edit-observation
@manage-studies
Feature: Inline Edit Observation
    In order to perform breeding activities
    As a user
    I should be able to inline edit an observation

Background: 
    Given I am on the Manage Studies page of specified program
    And I created a new study with RCBD design

@TestCaseKey=IBP-T3495
Scenario: Check inline edit of an observation for a numeric trait
    And I add a numeric trait to the study
    When I inline edit an observation for the numeric trait
    Then observation value for the numeric trait should be saved
    
@TestCaseKey=IBP-T3495
Scenario: Check inline edit of an observation for a categorical trait
    And I add a categorical trait to the study
    When I inline edit an observation for the categorical trait
    Then observation value for the categorical trait should be saved

@TestCaseKey=IBP-T3495
Scenario: Check if user can keep an out-of-bound value for a categorical trait
    And I add a categorical trait to the study
    When I inline edit an observation for the categorical trait using an out-of-bound value
    And I confirm to keep the value 
    Then out-of-bound value for the categorical trait should be saved
    #If possible, assert also the color of the cell

@TestCaseKey=IBP-T3495
Scenario: Check if user can discard an out-of-bound value for a categorical trait
    And I add a categorical trait to the study
    When I inline edit an observation for the categorical trait using an out-of-bound value
    And I confirm to discard the value 
    Then out-of-bound value for the categorical trait should not be saved

@TestCaseKey=IBP-T3495
Scenario: Check inline edit of an observation for a date trait
    And I add a date trait to the study
    When I inline edit an observation for the date trait
    Then observation value for the date trait should be saved
@TestCaseKey=IBP-T3495
Scenario: Check inline edit of an observation for a character trait
    And I add a character trait to the study
    When I inline edit an observation for the character trait
    Then observation value for the date trait should be saved
