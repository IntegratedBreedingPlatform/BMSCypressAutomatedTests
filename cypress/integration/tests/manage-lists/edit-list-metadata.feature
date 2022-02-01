@edit-list-metadata
@manage-lists

Feature: Edit List Metadata
In order to update details of an existing list
As a user
I should be able to edit list metadata

Background: 
    Given I am on the Germplasm Lists page of specified program
@TestCaseKey=IBP-T3422
@smoke-test
Scenario: Verify edit of list metadata
    Given I import a new list
    And I open the imported list
    When I navigate to edit metadata screen
    And I modified all existing list metadata with valid inputs
    And I save list metadata changes
    Then a success message that list metadata is saved displays
@TestCaseKey=IBP-T3401
Scenario: Verify error message when entered list name that exceeds max char length
    Given I open an existing list
    When I navigate to edit metadata screen 
    And I entered list name that exceeds max char length
    And I save list metadata changes
    Then an error message that name must not exceed 50 characters displays
@TestCaseKey=IBP-T3401
Scenario: Verify error message when entered list description that exceeds max char length
    Given I open an existing list
    When I navigate to edit metadata screen 
    And I entered list description that exceeds max char length
    And I save list metadata changes
    Then an error message that description must not exceed 255 characters displays

@TestCaseKey=IBP-T3401
Scenario: Verify error message when entered list name that exists in another list
    Given I import a new list
    And I am on the Germplasm Lists page of specified program
    And I open an existing list
    When I navigate to edit metadata screen 
    And I entered list name that exists in another list
    And I save list metadata changes
    Then an error message that there is an existing item with the same name displays
