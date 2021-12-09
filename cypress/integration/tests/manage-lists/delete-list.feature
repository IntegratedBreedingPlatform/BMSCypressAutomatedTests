@delete-list
@manage-lists

Feature: Delete List
In order to delete an existing list
As a user
I should be able to delete an existing list

Background: 
    Given I am on the Germplasm Lists page of specified program
    And I open an existing list
@TestCaseKey=IBP-T3368
@smoke-test
@ignore    
Scenario: Delete an existing list
    When I click Delete list 
    And I click confirm in the delete germplasm list screen
    Then I should see a message that the list is deleted successfully 
    And the list is no longer available

@TestCaseKey=IBP-T3368
@ignore    
Scenario: Cancel deletion of an existing list
    When I click Delete list 
    And I click Cancel in the delete germplasm list screen
    Then the delete germplasm list screen closes
    And the list is not deleted

@TestCaseKey=IBP-T3368
@ignore    
Scenario: Check if delete list option is available if list is locked
    When I lock the list
    Then the Delete list is not available