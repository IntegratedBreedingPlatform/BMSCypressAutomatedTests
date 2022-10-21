@manage-inventory
@view-filter-lot-records
Feature: View and Filter Lots Records
  As a user with Manage inventory permission
  I want to view and filter inventory lots so I review my inventory data accordingly

Background:
  Given germplasm with lot records already exists
  And I am on the Manage Inventory page of specified program

@TestCaseKey=IBP-T494
@smoke-test
Scenario: View and filter lot records by germplasm list
  When I filter lot records by a germplasm list
  Then I should be able to see that the lot records were filtered successfully