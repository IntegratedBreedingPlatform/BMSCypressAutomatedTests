Feature: Check BMS sidebar links
    @TestCaseKey=IBP-T3157
    Scenario Outline: Check BMS sidebar links
        
        Given I am already logged in to BMS
        When I launch a program
        And I expand "sidebar category"
        And I navigate to "sidebarlink"
        Then The "sidebarlink" page should display
        
        Examples:
        
        |sidebar category|sidebarlink|
        |GERMPLASM|Manage Germplasm|
        |LISTS|Germplasm Lists|
        |LISTS|Samples Lists|
        |STUDIES|Manage Studies|
        |STUDIES|Browse Studies|
        |STUDIES|Import Datasets|
        |STUDIES|Single-Site Analysis|
        |STUDIES|Multi-Site Analysis|
        |INVENTORY|Manage Inventory|
        |QUERIES|Graphical Queries|
        |QUERIES|Head to Head Query|
        |QUERIES|Multi-trait Query|
        |GENOTYPING|Low Density|
        |GENOTYPING|High Density|
        |CROP ADMINISTRATION|Manage Ontologies|
        |CROP ADMINISTRATION|Manage Metadata|
        |PROGRAM ADMINISTRATION|Manage Program Settings|