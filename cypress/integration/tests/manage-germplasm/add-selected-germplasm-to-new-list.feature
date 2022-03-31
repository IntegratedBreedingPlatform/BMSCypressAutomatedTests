@add-selected-germplasm-to-new-list
@manage-germplasm
Feature: Add Selected Germplasm to New List
    In order to create a new list
    As a user
    I should be able to add selected germplasm to a new list
Background: 
        Given I am on the Germplasm Manager page

@TestCaseKey=IBP-T1638
@smoke-test
    Scenario: Add selected germplasm entries to a new list
        When I select some germplasm entries
        And I add selected germplasm entries to a new list
        And I save the new list
        Then a message saying germplasm list successfully saved should display
        And I am on the Germplasm Lists page of specified program
        And the new list should include the selected germplasm list

@ignore
@TestCaseKey=IBP-T1498
    Scenario: Cancel adding selected germplasm entries to an new list
        When I select some germplasm entries
        And I add selected germplasm entries to a new list
        And I cancel saving the the list
        Then the list saving screen should close

@ignore
@TestCaseKey=IBP-T1498
    Scenario: Add selected entries to a new list in Crop List folder
        When I select some germplasm entries
        And I add selected germplasm entries to an new list
        And I save the new list in Crop Lists folder
        Then a message saying germplasm entries added to list successfully should display  
        And the status of the saved crop list should be locked      

@ignore
@TestCaseKey=IBP-T1498
    Scenario: Add selected entries from different pages to a new list
        When I select germplasm entries from different pages
        And I add selected germplasm entries to an new list
        And I save the new list
        Then a message saying germplasm entries added to list successfully should display

@ignore
@TestCaseKey=IBP-T1498
    Scenario: Filter entries and add all to a new list
        When I filter some germplasm entries by GID
        And I select all filtered germplasm entries
        And I add selected germplasm entries to a new list
        And I save the new list
        Then a message saying germplasm entries added to list successfully should display

@ignore
@TestCaseKey=IBP-T1498
    Scenario: Add all entries on the current page to a new list
        When I select all germplasm entries on the current page
        And I add selected germplasm entries to a new list
        And I save the new list
        Then a message saying germplasm entries added to list successfully should display
