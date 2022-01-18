@export-import-study-book
@manage-studies
Feature: Export and Import Study Book
    In order to perform breeding activities
    As a user
    I should be able export and import study book

Background: 
    Given I am on the Manage Studies page of specified program
    And I created a new study with RCBD design with traits

@TestCaseKey=IBP-T5384
Scenario: Check if user can export and import study books for trial (excel) and review out of bound values
    When I export study book for an instance in excel format
    And I import the study book with out of bound values for a categorical trait
    And I accept all out of bound values as is
    Then observation all imported values will be accepted including the out of bound values
    #Assert if all expected values are correctly display
    #If possible, assert the color of the cells with out of bound values
    