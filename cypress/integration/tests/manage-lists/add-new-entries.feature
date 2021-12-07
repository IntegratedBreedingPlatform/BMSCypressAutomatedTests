@add-new-entries
@manage-lists

Feature: Add New Entries
In order to update entries in an existing germplasm list
As a user
I should be able to add new entries to a germplasm list

Background: 
    Given I am on the Germplasm Lists page of specified program
    And I open an existing list
@TestCaseKey=IBP-T3366
@smoke-test  
Scenario: Add entries in all page to a list
    When I navigate to add new entries screen
    And I select all entries and add to the list
    Then I should see a message that entries are added successfully 
    And I should be see that the list entries are updated

@TestCaseKey=IBP-T3366   
Scenario: Add random entries to a list
    When I navigate to add new entries screen
    And I select random entries and add to the list
    Then I should see a message that entries are added successfully 
    And I should be see that the list entries are updated

@TestCaseKey=IBP-T3366
 Scenario: Add all entries in the current page to a list
    When I navigate to add new entries screen
    And I select all entries on the current page and add to the list
    Then I should see a message that entries are added successfully 
    And I should be see that the list entries are updated

# @ignore
# @TestCaseKey=IBP-T3366
# Scenario: Filter entries and add to a list
#     When I navigate to add new entries screen
#     And I filter an entry by GID and add to the list
#     Then I should see a message that entries are added successfully 
#     And I should be see that the list entries are updated
#     #Assert total count if updated

# @ignore
# @TestCaseKey=IBP-T3366
# Scenario: Add the same entries to a list
#     When I navigate to add new entries screen
#     And I filter for an entry that exists in the list and add again to the list
#     Then I should see a message that entries are added successfully 
#     And I should be see that the list entries are updated
#     #Assert total count if updated
