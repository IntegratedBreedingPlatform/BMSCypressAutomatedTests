@reorder-entries
@manage-lists

Feature: Reorder Entries
In order to change the order of entries in a germplasm list
As a user
I should be able to reorder entries of a list

Background: 
    Given I import a new list
    And I open the imported list

@ignore
@TestCaseKey=IBP-T3381
@smoke-test
Scenario: Check if user can reorder entries by specific position of the entry number
    When I select a germplasm entry
    And I navigate to reorder list screen
    And I specify a position
    Then a success message about reordering of entries should display
    And the selected germplasm should be on the specified position

@ignore
@TestCaseKey=IBP-T3248
Scenario: Check if user can reorder one entry at the beginning of the list
    When I select a germplasm entry
    And I navigate to reorder list screen
    And I select the starting position to be at the beginning of the list
    Then a success message about reordering of entries should display
    And the selected germplasm should be at the beginning of the list
@TestCaseKey=IBP-T3248
Scenario: Check if user can reorder one entry at the end of the list
    When I select a germplasm entry
    And I navigate to reorder list screen
    And I select the starting position to be at the end of the list
    Then a success message about reordering of entries should display
    And the selected germplasm should be at the end of the list

@ignore
@TestCaseKey=IBP-T3248
Scenario: Check if user can reorder multiple entries by specific position of the entry number
    When I select multiple germplasm entries
    And I navigate to reorder list screen
    And I specify a position
    Then a success message about reordering of entries should display
    And the selected germplasm entries should reordered to the specified position

@TestCaseKey=IBP-T3248
Scenario: Check if user can reorder multiple entries at the beginning of the list
    When I select multiple germplasm entries
    And I navigate to reorder list screen
    And I select the starting position to be at the beginning of the list
    Then a success message about reordering of entries should display
    And the selected germplasm entries should be at the beginning of the list
@TestCaseKey=IBP-T3248
Scenario: Check if user can reorder multiple entries at the end of the list
    When I select multiple germplasm entries
    And I navigate to reorder list screen
    And I select the starting position to be at the end of the list
    Then a success message about reordering of entries should display
    And the selected germplasm entries should be at the end of the list

@TestCaseKey=IBP-T3248
Scenario: Check validation when the user has not selected entries and wants to re-order the entries 
    When I navigate to reorder list screen
    Then a message asking to select at least one entry should display

    
@TestCaseKey=IBP-T3248
Scenario: Check validation when the user specified invalid position
    When I select a germplasm entry
    And I navigate to reorder list screen
    And I specify an invalid position
    Then the reorder button is still disabled

@TestCaseKey=IBP-T3248
Scenario: Check reordering for a locked list
    When I lock the imported list
    Then the option for reordering list is not available