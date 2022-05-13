@manage-inventory
@view-filter-transaction-records
Feature: View and Filter Transaction Records
  As a user with Manage inventory permission
  I want to view and filter transaction records
Background:
  Given germplasm with lot records already exists
  And I am on the Manage Inventory page of specified program

@TestCaseKey=IBP-T499
@smoke-test
Scenario: View and filter lot records by germplasm list
  When I navigate to transaction records page
  And I filter transaction records by GID
  And I filter transaction records by type
  And I filter transaction records by status
  Then I should be able to see that the transaction records were filtered successfully