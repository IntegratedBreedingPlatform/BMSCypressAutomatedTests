@create-variable
@manage-ontology

Feature: Create variable
    In order to use custom variables for breeding activities
    As a user
    I should be able to create new variables in ontology manager

Background:
    Given I am on the Manage Ontologies page of specified program

Scenario Outline: Create a variable with entry detail type
    When I click on add new ontology term button
    And I select Variable type
    And I specified the Variable name and description
    And I added a new property
    And I added a new method
    And I added a new <scaleType> scale
    And I selected entry detail type
    And I saved the details
    Then I should be able to search and see the added Variable in the list

Examples:
|scaleType|
|categorical|
|numeric|
|date|
|character|
