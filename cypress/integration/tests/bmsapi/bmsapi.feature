@BMSAPI
Feature: BMSAPI
    In order to access various BMSAPI calls
    As a user
    I should be able to see BMSAPI page

@TestCaseKey=IBP-T3184
@sanity-test
@smoke-test
    Scenario: Launch BMSAPI page
        Given I am already logged in to BMS
        When I navigate to the BMSAPI page
        Then The API Swagger page displays