@manage-lists
@add-entry-details
Feature: Add entry details
  In order to add entry details to an existing germplasm list
  As a user
  I should be able to add entry details to an existing germplasm list

Background:
  # TODO: use the entry detail variable created previosly in Manage Ontologies
  # Given I added entry detail to Ontology Manager
  Given I am on the Germplasm Lists Beta page of specified program
  And I open an existing list

@TestCaseKey=IBP-T3398
@smoke-test
# TODO: implement an outline scenario in order to parameterize the test using the values defined in 'Examples' section
# Scenario Outline: Add entry details and value to an existing germplasm list
Scenario: Add entry details and value to an existing germplasm list
  When I navigate to add entry details screen
  And I add entry details variable to the list
  And I add value to the entry detail
  Then I should be able to see that the variable is added to the germplasm list

#Examples:
#  |scaleType|value|
#  |numeric|100|
#  |categorica|CategoryA|
#  |date|20210101|
#  |text|Text1|
