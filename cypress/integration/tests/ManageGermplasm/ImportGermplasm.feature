@import-germplasm
@manage-germplasm
Feature: Import Germplasm
    In order to create germplasm records in BMS
	As a breeder
	I want to import a germplasm records using a template file

@TestCaseKey=IBP-T3177    
@sanity-test
@smoke-test
@clean-install
    Scenario: Import new germplasm records
        Given I am on the Germplasm Manager page
        When I select Import germplasm from Actions
        And I select a file to upload
        #Note: The assumption here is that the file to upload already has breeding methods, location and inventory details
        And I click Next on Import Germplasm screen
        And I click Next on Create Inventory screen
        And I click Save on Review Germplasm screen
        Then saving of germplasm succeeds