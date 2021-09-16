Feature: Check BMS version on login page
    @TestCaseKey=IBP-T3154
    Scenario: Check BMS version on login page
        
        Given I navigate to BMS login screen
        Then The BMS login should have the correct version