@manage-inventory
@confirm-pending-transactions
Feature: Confirm Pending Transactions
  As a user with Manage inventory permission
  I want to create inventory lots so I can match them into existing germplasm in the system

Background:
  Given germplasm records already exists
  And I am on the Manage Inventory page of specified program

@TestCaseKey=IBP-T501
@focus @smoke-test
Scenario: Confirm Pending Deposit and Withdrawal Transactions
  Given I have created a new lot
  And I filter by Lot UID
  And I create Deposit Inventory 
  And I create Withdrawal Inventory
  When I navigate to View Transactions tab
  And I filtered transactions by the germplasm list with existing pending transactions
  And I confirmed all filtered transactions
  Then I should see a success message that transactions were successfully confirmed