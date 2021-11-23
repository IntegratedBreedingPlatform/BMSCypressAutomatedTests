@add-to-list
@manage-lists

Feature: Add to List
In order to add entries in an existing germplasm list
As a user
I should be able to add entries to a germplasm list

Background: 
    Given I am on the Germplasm Lists Beta page of specified program
    And I open an existing list
@TestCaseKey=IBP-T3371
@smoke-test
@ignore    
Scenario: Add all entries from all pages to the list
    When I select all entries from all pages 
    And select the designation list in the add to list screen
    Then I should see a message that entries are added successfully 
    And I should be see that the list entries are updated
    #Assert total count if updated 

@TestCaseKey=IBP-T3371
@ignore    
Scenario: Add random entries to a list
    When I select some entries in the current page
    And select the designation list in the add to list screen
    Then I should see a message that entries are added successfully 
    And I should be see that the list entries are updated
    #Assert total count if updated 

@ignore
@TestCaseKey=IBP-T3371
 Scenario: Add all entries in the current page to a list
    When I select all entries from the current page
    And select the designation list in the add to list screen
    Then I should see a message that entries are added successfully 
    And I should be see that the list entries are updated
    #Assert total count if updated

@ignore
@TestCaseKey=IBP-T3371
Scenario: Filter entries and add to a list
    When I filter by germplasm list and select the entries
    And select the designation list in the add to list screen
    Then I should see a message that entries are added successfully 
    And I should be see that the list entries are updated
    #Assert total count if updated

@ignore
@TestCaseKey=IBP-T3371
Scenario: Add the same entry to a list
    When I select the same entry that exists in the list
    And select the designation list in the add to list screen
    Then I should see a message that entries are added successfully 
    And I should be see that the list entries are updated
    #Assert total count if updated
