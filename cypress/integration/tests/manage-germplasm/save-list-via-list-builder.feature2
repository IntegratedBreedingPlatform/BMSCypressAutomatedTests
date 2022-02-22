@save-list-via-list-builder
@manage-germplasm
Feature: Save List Using List Builder
    In order to create a new list
    As a user
    I should be able to add entries to list builder and save as list
Background: 
        Given I am on the Germplasm Manager page
@ignore
@TestCaseKey=IBP-T2330
@smoke-test
    Scenario: Select germplasm entries and create a new list using list builder
        When I select some germplasm entries
        And I drag the selected entries to the list builder
        And I save the new list from the list builder
        Then a message saying germplasm list successfully saved should display
        And the new list should include the selected germplasm entries

@ignore
@TestCaseKey=IBP-T3562
    Scenario: Select all entries different pages and create a new list in list builder
        When I select germplasm entries from different pages
        And I drag the selected entries to the list builder
        And I save the new list from the list builder
        Then a message saying germplasm list successfully saved should display

@ignore
@TestCaseKey=IBP-T3562
    Scenario: Select all entries on current page and create a new list in list builder
        When I select all germplasm entries on the current page
        And I drag the selected entries to the list builder
        And I save the new list from the list builder
        Then a message saying germplasm list successfully saved should display

@ignore
@TestCaseKey=IBP-T3562
    Scenario: Filter entries and select all and create a new list in list builder
        When I filter some germplasm entries by GID
        And I select all filtered germplasm entries
        And I drag the selected entries to the list builder
        And I save the new list from the list builder
        Then a message saying germplasm list successfully saved should display