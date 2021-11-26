@create-variable
@manage-ontology

Feature: Create variable
In order to use custom variables for breeding activities
As a user
I should be able to create new variables in ontology manager

Background:
    Given I am on the Manage Ontology page of specified program
@ignore
Scenario Outline: Create a variable with entry detail type
    When I navigate to create variable page
    And I specified the variable name and description
    And I added a new property
    And I added a new method
    And I added a new <scaleType> scale
    And I selected entry detail type
    And I saved the details
    Then I should be able to search and see the added variable in the list

Examples:
|scaleType|
|numeric|
|categorical|
|date|
|character|