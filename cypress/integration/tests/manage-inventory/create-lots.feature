@manage-inventory
@create-lots
Feature: Create Inventory Lots
  As a user with Manage inventory permission
  I want to create inventory lots so I can match them into existing germplasm in the system

Background:
  Given germplasm records already exists
  And I am on the Manage Inventory page of specified program

@TestCaseKey=IBP-T495
@smoke-test
Scenario: Create new lot with initial deposit amount
  When I navigate to create lots screen
  And I specified valid values for lot details
  And I enable initial deposit
  And I specify valid deposit details
  And I save the new lot
  Then I should be able to see that the new lot has been created successfully