@add-to-list
@manage-lists

Feature: Add to List
In order to add entries in an existing germplasm list
As a user
I should be able to add selected entries to another germplasm list

Background: 
    Given I am on the Germplasm Lists page of specified program
    And I import a list to add entries to

@TestCaseKey=IBP-T3371
Scenario: Add random entries to another list
    Given I open an existing list
    When I select some entries in the current page
    And I select germplasm list in the add entries to list screen
    Then I should see a message that entries are added successfully

@TestCaseKey=IBP-T3371
 Scenario: Add all entries in the current page to another list
    Given I open an existing list
    When I select all entries from the current page
    And I select germplasm list in the add entries to list screen
    Then I should see a message that entries are added successfully

@TestCaseKey=IBP-T3371
Scenario: Filter entries and add to another list
  Given I open an existing list
  When I filter an entry by GID and select the entries
  And I select germplasm list in the add entries to list screen
  Then I should see a message that entries are added successfully

@TestCaseKey=IBP-T3371
Scenario: Add the same entry to another list
    Given I open an existing list
    When I select the same entry that exists in the list
    And I select germplasm list in the add entries to list screen
    Then I should see a message that entries are added successfully

@TestCaseKey=IBP-T3371
@ignore
Scenario: Add entries to another list that is locked
    Given I lock the imported list
    And  I am on the Germplasm Lists page of specified program
    When I open an existing list
    And I select some entries in the current page
    And I select germplasm list in the add entries to list screen
    Then I should see a message that the germplasm list is locked
