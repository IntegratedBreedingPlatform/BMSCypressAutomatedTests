@manage-inventory
@import-lot-updates
Feature: Import Inventory Lot Updates
  As a user with Manage inventory permission
  I want to import inventory lots updates
Background:
  Given germplasm records already exists
  And I am on the Manage Inventory page of specified program
  And I have created a new lot

@TestCaseKey=IBP-T1479
@smoke-test
Scenario: Check import of lot updates using excel format
  When I navigate to import lot update screen
  And I download an import lot update template file
  And I import the lot update template file with complete and valid details
  Then I should be able to see that the lot has been updated successfully
