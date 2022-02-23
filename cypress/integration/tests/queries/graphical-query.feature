@graphical-query
@queries
Feature: Graphical Query
    In order to perform breeding activities
    As a user
    I should be able to perform geographical queries on BMS

Background:
    Given I am on the Manage Studies page of specified program
    And I opened a study with RCBD design
    And I add EPo_Cmp_ratio trait to the study with observations
    And I add ASI_Cmp_day trait to the study with observations

@TestCaseKey=IBP-T147
@smoke-test
Scenario: Filter studies using graphical filtering tool and export transformed data - overall average
    Given I am on the Graphical Queries page of specified program
    When I selected a study name with existing observation
    And I selected PLOT as observation level
    And I loaded the query by graphical filtering
    # And I selected a range of values for trait in the Where section
    And I exported the data by overall average
    Then The export file should be downloaded
