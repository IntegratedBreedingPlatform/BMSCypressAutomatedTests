@manage-inventory
@add-inventory-columns
Feature: Add Inventory Columns
  As a user with Manage Inventory permission
  I want to add inventory columns to lot records

Background:
  Given germplasm records already exists
  And I am on the Manage Inventory page of specified program
  And I have created a new lot

@TestCaseKey=IBP-T4017
@smoke-test
Scenario: Check if user can add additional columns including inventory attributes
  When I added attributes to the lot record
  And I add additional columns including inventory attributes
  Then I should be able to see the columns added to the lot table
