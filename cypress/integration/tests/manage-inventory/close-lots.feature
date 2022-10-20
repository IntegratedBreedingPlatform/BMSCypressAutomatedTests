@manage-inventory
@close-lots
Feature: Close Inventory Lots
  As a user with Manage inventory permission
  I want to create inventory lots so I can match them into existing germplasm in the system

Background:
  Given germplasm records already exists
  And I am on the Manage Inventory page of specified program

@TestCaseKey=IBP-T647
@smoke-test
Scenario: Verify that user can close lots
  Given I have created a new lot
  When I select the created lot
  And I close the lot
  Then I should see that the lot is closed successfully
