Feature: BMS Login

    I want to login as an admin

    Scenario: Verify login as an admin
        Given I go to BMS login page
        When I enter valid user credentials
        And I click login
        Then Dashboard page will display