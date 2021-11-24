@manage-lists
@add-entry-details
Feature: Add entry details to an existing list
  In order to add entry details to an existing germplasm list
  As a user
  I should be able to add entry details to an existing germplasm list

  @smoke-test
  @setup
  Scenario: I am on the Germplasm Lists Beta
    Given I am on the Germplasm Lists Beta page of specified program

  @smoke-test
  Scenario: Add entry details and value to an existing germplasm list
    When I click on a Germplasm List name
    And I click Add on Entry Details section
    And I select a Variable
    And Check that Entry Details section has the recently added Variable
    And Germplasm List table has the recently added Variable
    And I enter a value to the entry detail


