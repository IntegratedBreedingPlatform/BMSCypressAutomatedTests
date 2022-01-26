@create-georeference
@manage-studies
Feature: Create Georeference
    In order to perform breeding activities
    As a user
    I should be able to create a georeference on a study
@ignore
@TestCaseKey=IBP-T622
@smoke-test
Scenario: Check creation georeference for an existing study with fieldmap
    Given I am on the Manage Studies page of specified program
    When I make a study with fieldmap
    And I navigate to create reference screen
    And I select an environment
    And I draw a rectangle
    And I load the details
    And I save the details
    Then A success that says plots are updated should display
