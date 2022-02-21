@generate-plot-visualization
@manage-studies
Feature: Generate Plot Visualization
    In order to perform breeding activities
    As a user
    I should be able to create crosses

Background: 
    Given I am on the Manage Studies page of specified program
    And I opened a study with RCBD design
    And I add GCol_E_1to9 trait to the study with observations
    And I add ASI_Cmp_day trait to the study with observations


@TestCaseKey=IBP-T621
@smoke-test
Scenario: Check if user can generate plot visualization - auto
    When I navigate to plot visualization screen
    And I select Scatterplot as plot type
    And I select Auto as regression method
    And I select variable GCol_E_1to9 on X and ASI_Cmp_day on Y
    And I generate plot visualization
    Then a plot visualization graph should display
    


