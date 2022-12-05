@manage-inventory
@add-inventory-columns
Feature: Add Inventory Columns
  As a user with Manage Inventory permission
  I want to add inventory columns to lot records

Background:
  Given germplasm with lot records already exists
  And I am on the Manage Inventory page of specified program

@TestCaseKey=IBP-T4017
@smoke-test
Scenario: Check if user can add additional columns including inventory attributes
  When I filter lot records by a germplasm list
  And I add additional columns including inventory attributes
  Then I should be able to columns added to the lot table
  