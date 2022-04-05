@add-selected-germplasm-to-existing-list
@manage-germplasm
Feature: Add Selected Germplasm to Existing List
    In order to add entries to an existing list
    As a user I should be able to add selected germplasm to existing list

Background: 
        Given I reload the Germplasm Manager page

@TestCaseKey=IBP-T2178
@smoke-test
    Scenario: Add selected germplasm entries to an existing list 
        When I select some germplasm entries
        And I add select germplasm entries to an existing list
        And I confirm to add selected germplasm to the list
        Then a message saying germplasm entries added to list successfully should display

@TestCaseKey=IBP-T1721
    Scenario: Cancel adding selected germplasm entries to an existing list
        When I select all germplasm entries on the current page
        And I add select germplasm entries to an existing list
        And I cancel adding selected germplasm entries to the list
        Then I should see the list tree

@TestCaseKey=IBP-T1721
    Scenario: Add all entries on the current page to an existing list
        When I select all germplasm entries on the current page
        And I add select germplasm entries to an existing list
        And I confirm to add selected germplasm to the list
        Then a message saying germplasm entries added to list successfully should display

@TestCaseKey=IBP-T1721
    Scenario: Filter entries and add all to an existing list
        When I filter some germplasm entries by GID
        And I select all germplasm entries on the current page
        And I add select germplasm entries to an existing list
        And I confirm to add selected germplasm to the list
        Then a message saying germplasm entries added to list successfully should display

@TestCaseKey=IBP-T1721
    Scenario: Add the same entries to an existing list
        When I filtered germplasm entries by the existing germplasm list
        And I select all germplasm entries on the current page
        And I add select germplasm entries to an existing list
        And I confirm to add selected germplasm to the list
        Then a message saying germplasm entries added to list successfully should display

@TestCaseKey=IBP-T1721
    Scenario: Add selected entries from different pages to an existing list
        When I select germplasm entries from different pages
        And I add select germplasm entries to an existing list
        And I confirm to add selected germplasm to the list
        Then a message saying germplasm entries added to list successfully should display

@TestCaseKey=IBP-T1721
Scenario: Add germplasm entries to an existing locked crop list
        When I select some germplasm entries
        And I add select germplasm entries to an existing locked crop list
        And I confirm to add selected germplasm to the list
        Then an error message saying that list is locked should display
         