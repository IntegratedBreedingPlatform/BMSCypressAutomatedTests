@create-fieldmap
@manage-studies
Feature: Create Fieldmap
    In order to perform breeding activities
    As a user
    I should be able to create a fieldmap on a study

@ignore
@TestCaseKey=IBP-T618
@smoke-test
Scenario: Check creation of fieldmap on an existing study in row col order
    Given I am on the Manage Studies page of specified program
    When I opened an existing study with no fieldmap yet
    And I navigate to create fieldmap page
    And I add field and block
    And I specify valid row, range and plot details
    #If possible, derive factors of the value displayed on the plots needed
    #Use default number of rows per plot
    And I navigate to planting details page
    And I select Row/Column layout order
    And I navigate to generate fieldmap page
    And I click Finish
    Then I should be directed back to the study