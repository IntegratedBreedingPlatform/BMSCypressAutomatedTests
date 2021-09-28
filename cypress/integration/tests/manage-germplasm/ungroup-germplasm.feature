@ungroup-germplasm
@manage-germplasm
Feature: Ungroup Germplasm

@TestCaseKey=IBP-T2963
@smoke-test
Scenario: Check if user can ungroup germplasm entries
     Given Given I am on the Germplasm Manager page
     And I filtered a derivative list with grouped germplasm entries
     And I select all germplasm entries from the list 
     When I ungroup the germplasm entries
     Then I should see that all germplasm entries are ungrouped
     # Assert success message and the GROUPID column (should no longer have GROUPID values)
