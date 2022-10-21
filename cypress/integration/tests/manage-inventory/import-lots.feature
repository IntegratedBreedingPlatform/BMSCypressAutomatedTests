@manage-inventory
@import-lots
Feature: Import Inventory Lots
  As a user with Manage inventory permission
  I want to import inventory lots so I can match them into existing germplasm in the system

Background:
  Given germplasm records already exists
  And I am on the Manage Inventory page of specified program

@TestCaseKey=IBP-T496
@smoke-test
Scenario: Create new lot with initial deposit amount
  When I navigate to import lots screen
  And I download an import lot template file
  And I import the lot template file with complete and valid details
  Then I should be able to see that the lot has been imported successfully