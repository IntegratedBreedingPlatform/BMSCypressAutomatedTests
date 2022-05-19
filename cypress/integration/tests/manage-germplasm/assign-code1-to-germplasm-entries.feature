@assign-code1-germplasm
@manage-germplasm
Feature: Assign Code 1 to Germplasm Entries
    In order to assign code 1 to germplasm entries
    As a user 
    I should be able to select grouped germplasm entries and assign code 1 using a naming option
Background: 
    Given grouped germplasm records already exists
@TestCaseKey=IBP-T2961
@smoke-test
Scenario: Check if user can assign code 1 to grouped germplasms using automatic naming generation
    Given I am on the Germplasm Manager page
  #	And I select grouped germplasm entries from the list
  #  When I assign code 1 to the germplasm entries using automatic naming generation
  #  Then I should see that the selected entries have new generated names
