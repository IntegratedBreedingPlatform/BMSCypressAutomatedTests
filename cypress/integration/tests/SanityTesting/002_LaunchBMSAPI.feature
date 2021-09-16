Feature: Launch BMSAPI page
    @TestCaseKey=IBP-T3184
    Scenario: Launch BMSAPI page
        
        Given I am already logged in to BMS
        When I navigate to BMSAPI page
        Then API Swagger page will display