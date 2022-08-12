@manage-crop-settings
@create-name-type
Feature: Create Name Type

    In order to carry out various breeding activities
	As a user
	I should be able to create a new name type

  Background:
    Given I am on the Manage Crop Settings page of specified program

@TestCaseKey=IBP-T3060    
@smoke-test
    Scenario: Create a new name type
        When I navigate  Germplasm Name Types tab
        And I create a new name type
        Then A message displays saying name type was created successfully
