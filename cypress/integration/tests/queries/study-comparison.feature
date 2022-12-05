@study-comparison
@queries
Feature: Study Comparison
    In order to perform breeding activities
    As a user
    I should be able to perform study comparison in BMS

Background:
    Given there are multiple studies that have observations for the same traits
    And I am on the Graphical Queries page of specified program

@TestCaseKey=IBP-T1647
@smoke-test
Scenario: Check that user can perform study comparison
    When I selected multiple study names with existing observations
    And I selected PLOT as observation level
    And I loaded the query by study comparison
    And I selected variable to compare
    And I proceed with the comparison
    Then I should be able to see graphs that shows the details of comparison of the selected studies

