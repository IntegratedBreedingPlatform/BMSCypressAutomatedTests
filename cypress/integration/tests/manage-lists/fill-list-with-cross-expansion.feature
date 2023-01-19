@fill-list-with-cross-expansion
@manage-lists

Feature: Fill List with Cross Expansion
In order view cross expansion of germplasm entries in a list
As a user
I should be able to add cross column to a germplasm list and fill with cross expansion 

Background:
    Given I am on the Manage Studies page of specified program
    And I opened a study with RCBD design
    And I imported a cross and created a cross list
    And I am on the Germplasm Lists page of specified program 

@TestCaseKey=IBP-T4154
@smoke-test
Scenario: Check if user can add cross column and use cross expansion option to fill the values
    When I open the cross list
    And I add cross column
    And I fill the column with cross expansion
    Then I should see the cross expansion value of the entries

