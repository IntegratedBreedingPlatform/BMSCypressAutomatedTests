@create-fieldmap
@manage-studies
Feature: Create Fieldmap
    In order to perform breeding activities
    As a user
    I should be able to create a fieldmap on a study

Background: 
    Given I am on the Manage Studies page of specified program
    When I created a new study with basic details
    And I browsed germplasm list 
    And I generated experimental design using Randomized Complete Block design
    And Design generation is successful
    Then I should be directed back to the study

@TestCaseKey=IBP-T618
@smoke-test
Scenario: Check creation of fieldmap on an existing study in row col order

    When I click Make field map action from Field map options
    And I click OK to navigate to fieldmap page
    And I add field and block
    And I specify valid row, range and plot details
    And I navigate to planting details page
    And I select row column layout order
    And I navigate to generate fieldmap page
    And I click Finish
    Then I should be directed back to the study
    And Fieldmap range and fieldmap column are added in observation table
    