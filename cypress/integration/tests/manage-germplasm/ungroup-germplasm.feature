@ungroup-germplasm
@manage-germplasm
Feature: Ungroup Germplasm
    In order to remove germplasm from an existing group
    As a user 
    I should be ungroup germplasm entries
 
@TestCaseKey=IBP-T2963
@smoke-test
Scenario: Check if user can ungroup germplasm entries
    Given I am on the Germplasm Manager page
    And I imported a germplasm list with derivative germplasm entries
  	And I select all germplasm entries from the list
    And I mark the germplasm entries as fixed to assign them in a group
    And I select all germplasm entries from the list 
    When I ungroup the germplasm entries
    Then I should see that all germplasm entries are ungrouped
