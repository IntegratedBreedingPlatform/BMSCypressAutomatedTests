@assign-code-germplasm
@manage-germplasm
Feature: Assign Code to Germplasm Entries
    In order to assign code 1 to germplasm entries
    As a user 
    I should be able to select grouped germplasm entries and assign code 1 using a naming option
Background: 
    Given grouped germplasm records already exists
@TestCaseKey=IBP-T2961
@smoke-test
Scenario: Check if user can assign CODE 1 to a germplasm using automatic naming generation
    When I am on the Manage Germplasm page of specified program
    And I filtered germplasm entries by the GID of the existing grouped germplasm
    And I assign CODE 1 to a germplasm using automatic naming generation
    Then I should see that the selected entries have new generated names
@TestCaseKey=IBP-T2962
@smoke-test
Scenario: Check if user can assign CODE 2 manually to a germplasm entries by specifying code
    When I am on the Manage Germplasm page of specified program
    And I filtered germplasm entries by the GID of the existing grouped germplasm
    And I assign CODE 2 manually to a germplasm by specifying code
    Then I should see that the selected entries have new generated names
