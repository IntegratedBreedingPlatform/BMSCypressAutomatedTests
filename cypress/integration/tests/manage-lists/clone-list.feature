@manage-lists
@clone-list

Feature: Clone List
In order create another list with the same entries and details
As a user
I should be able to clone germplasm list

Background: 
    Given I am on the Germplasm Lists page of specified program
    And I open an existing list
    And I add entry details variable to the list
    And I add value to the entry detail

@TestCaseKey=IBP-T3406
@smoke-test
Scenario: Check if user can clone a list using a new list name
    When I clone the list
    And I save the list with a new name
    Then a message saying that germplasm list is cloned successfully should display
    And the cloned list is opened in another tab
    And the entry detail variables are available in the list
    And the entry detail values are available in the list

@TestCaseKey=IBP-T3493
Scenario: Check if user can clone the list using an existing list name
    When I clone the list
    And I save the list with an existing name
    Then a message saying that there is an existing item with the same name displays

@TestCaseKey=IBP-T3492
Scenario: Check if user can clone a locked list
    When I lock the imported list
    And I clone the list
    And I save the list with a new name
    Then a message saying that germplasm list is cloned successfully should display
    And the cloned list is opened in another tab
    And the entry detail variables are available in the list
    And the entry detail values are available in the list