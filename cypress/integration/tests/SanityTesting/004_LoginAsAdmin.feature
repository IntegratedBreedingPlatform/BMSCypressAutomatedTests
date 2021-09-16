Feature: Login as admin
    @TestCaseKey=IBP-T3155
    Scenario: Login as admin
        
        Given I navigate to BMS login screen
        When I enter valid admin username
        And I enter valid admin password
        Then BMS dashboard page displays