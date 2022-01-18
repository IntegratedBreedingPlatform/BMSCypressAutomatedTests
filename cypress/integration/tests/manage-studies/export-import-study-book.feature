@export-import-study-book
@manage-studies
Feature: Export and Import Study Book
    In order to perform breeding activities
    As a user
    I should be able export and import study book

Background: 
    Given I am on the Manage Studies page of specified program
    And I created a new study with RCBD design with traits

@ignore
@smoke-test
@TestCaseKey=IBP-T5384
Scenario: Check if user can export and import study book in excel format and accept out of bound values as is
    When I export study book for an instance in excel format
    And I import the study book with out of bound values for a categorical trait
    And I accept all out of bound values as is
    Then I should be on the accepted view of the observations
    And all imported values will be accepted including the out of bound values
    #Assert if all expected values are correctly display
    #If possible, assert the color of the cells with out of bound values

@ignore
@smoke-test
@TestCaseKey=IBP-T5384    
Scenario: Check if user can export and import study book in excel format and set out of bound values as missing
    When I export study book for an instance in excel format
    And I import the study book with out of bound values for a categorical trait
    And I accept pending valid values while set all out of bound values as missing
    Then I should be on the accepted view of the observations
    And all imported valid values will be accepted while the out of bound values are set as missing
    #Assert if all expected values are correctly display
    
@ignore
@smoke-test
@TestCaseKey=IBP-T5384
Scenario: Check if user can export and import study book in excel format and discard all pending values
    When I export study book for an instance in excel format
    And I import the study book with out of bound values for a categorical trait
    And I discard all pending values
    Then I should be on the accepted view of the observations
    And all imported valid values are discarded
    #Assert if trait columns are blank
    