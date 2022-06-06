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
Scenario: Check if user can assign CODE 1 to a germplasm using automatic naming generation
    When I assign CODE 1 to a germplasm using automatic naming generation
    Then I should see that the selected entries have new generated names
@focus 
Scenario: Check if user can assign CODE 2 manually to a germplasm entries by specifying code
    When I assign CODE 2 manually to a germplasm by specifying code
    Then I should see that the selected entries have new generated names
