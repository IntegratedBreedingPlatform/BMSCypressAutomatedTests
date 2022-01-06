@remove-entries
@manage-lists

Feature: Remove entries
In order to update entries in an existing germplasm list
As a user
I should be able to remove entries to a germplasm list

Background: 
    Given I am on the Germplasm Lists page of specified program
    And I open an existing list
@TestCaseKey=IBP-T3390
@smoke-test
Scenario: Remove random entries to the list
    When I select random entries in the list 
    And I click Remove entries
    Then I should see a message that entries are removed successfully 

@TestCaseKey=IBP-T3390
Scenario: Remove all entries in the current page
    When I select all entries in the current page
    And I click Remove entries
    Then I should see a message that entries are removed successfully 

@TestCaseKey=IBP-T3390
Scenario: Remove all filtered entries from the list
    When I filter the records by GID and select the entries
    And I click Remove entries
    Then I should see a message that entries are removed successfully

@TestCaseKey=IBP-T3390
Scenario: Cancel removal of entries in the page
    When I filter the records by GID and select the entries
    And I click Remove entries
    And I click Cancel in the Remove entries page
    Then the Remove entries page closes 
