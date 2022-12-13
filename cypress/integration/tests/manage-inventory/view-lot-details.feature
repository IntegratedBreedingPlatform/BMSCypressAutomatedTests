@manage-inventory
@view-lot-details
Feature: View Lot Details
  As a user with Manage inventory permission
  I want to view details of an inventory lot

Background:
  Given germplasm with lot records already exists
  And I am on the Manage Inventory page of specified program

@TestCaseKey=IBP-T3801
@smoke-test
Scenario: Check if user can view lot details
  When I filter lot records by a germplasm list
  And I click on stock ID of a lot
  Then I should be able to see the details of the lot
  