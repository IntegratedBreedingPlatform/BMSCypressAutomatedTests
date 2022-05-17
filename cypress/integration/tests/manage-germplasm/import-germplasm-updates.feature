@import-germplasm-updates
@manage-germplasm
Feature: Import Germplasm Updates
    In order to update existing germplasm records in BMS
	As a user
	I want to import updates of germplasm records using a template file

Background: 
        Given germplasm records already exists

@TestCaseKey=IBP-T3053    
@smoke-test
    Scenario: Import germplasm updates using basic template
        And I am on the Manage Germplasm page of specified program
        When I select Import germplasm updates from Actions
        And I download an import germplasm updates template
        And I import the germplasm update template file with completed and valid details
        Then saving of germplasm updates succeeds
