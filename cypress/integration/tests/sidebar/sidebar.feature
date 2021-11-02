@sidebar
Feature: Check BMS sidebar links
    In order to carry out various breeding activities
    As a user
    I should be able to see each sidebar pages

@TestCaseKey=IBP-T3157
@sanity-test
@clean-install
@update-install
    Scenario Outline: Check BMS sidebar links
        Given I am already logged in to BMS
        When I launch a program
        When I navigate to <sidebarlink> in the sidebar
        Then The <sidebarlink> page should display
        
        Examples:
        
        |sidebarlink|
        |Manage Germplasm|  
        |Germplasm Lists|
        |Samples Lists|
        |Germplasm Lists Beta|
        |Manage Studies|
        |Browse Studies|
        |Import Datasets|
        |Single-Site Analysis|
        |Multi-Site Analysis|
        |Manage Inventory|
        |Graphical Queries|
        |Head to Head Query|
        |Multi-trait Query|
        |Low Density|
        |High Density|
        |Manage Ontologies|
        |Manage Metadata|
        |Manage Program Settings|

@TestCaseKey=IBP-T3176
@sanity-test
@update-install
    Scenario: Check BMS version on sidebar     
        Given I am already logged in to BMS
        When I launch a program
        Then The BMS sidebar should have the correct version