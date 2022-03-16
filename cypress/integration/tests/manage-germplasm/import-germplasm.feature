@import-germplasm
@manage-germplasm
Feature: Import Germplasm
    In order to create germplasm records in BMS
	As a user
	I want to import a germplasm records using a template file

@TestCaseKey=IBP-T3177    
@sanity-test
@focus @clean-install
    Scenario: Import initial germplasm records
        Given I am on the Manage Germplasm  page of specified program
        When I select Import germplasm from Actions
        And I select a file to upload
        And I click Next on Import Germplasm screen
        And I click Next on Create Inventory screen
        And I click Save on Review Germplasm screen
        Then saving of germplasm succeeds
@TestCaseKey=IBP-T3177    
@smoke-test
    Scenario: Import new germplasm records
        Given I am on the Manage Germplasm page of specified program
        When I select Import germplasm from Actions
        And I select a file to upload
        And I click Next on Import Germplasm screen
        And I click Next on Create Inventory screen
        And I click Save on Review Germplasm screen
        Then saving of germplasm succeeds
#Note: The scenarios above are duplicated to be able to include import germplasm
# when running TAGS=(@smoke-test) and not @ignore and not @clean-install