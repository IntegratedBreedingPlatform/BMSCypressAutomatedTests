Feature: Check BMS version on sidebar
    @TestCaseKey=IBP-T3176
    Scenario: Check BMS version on sidebar
        
        Given I am already logged in to BMS
        When I launch a program
        Then The BMS sidebar should have the correct version