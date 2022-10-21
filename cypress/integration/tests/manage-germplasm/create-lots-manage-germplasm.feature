@manage-germplasm
@create-lots-manage-germplasm
Feature: Create Inventory Lots in Manage Germplasm
  As a user
  I want to create inventory lots so I can match them into existing germplasm in the system

Background:
  Given I am on the Manage Germplasm page of specified program

@TestCaseKey=IBP-T3005
@smoke-test
Scenario: Create new lot with initial deposit amount
  When I select some germplasm entries
  And I navigate to create lot screen
  And I specified valid values for lot details
  And I enable initial deposit
  And I specify valid deposit details
  And I confirm transactions on saving
  # Note: Avoid hard coding the values in the page object functions,
  # instead pass them as argument from the step def
  And I save the new lot
  Then I should be able to see that the new lot has been created successfully
  # Assert response code of POST lots api call to be 200 and the success message that will display after saving lots