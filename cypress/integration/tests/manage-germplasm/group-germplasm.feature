@group-germplasm
@manage-germplasm
Feature: Group Germplasm
    In order to group germplasm based on the origin
    As a user 
    I should be able to add germplasm to a management group and mark as fixed
@TestCaseKey=IBP-T2960
@smoke-test
Scenario: Check if user can add germplasms to a group and mark them as fixed
    Given I am on the Germplasm Manager page
    And I imported a germplasm list with derivative germplasm entries
  	And I select all germplasm entries from the list
    When I mark the germplasm entries as fixed to assign them in a group
    Then I should see that the selected entries have assigned group id
