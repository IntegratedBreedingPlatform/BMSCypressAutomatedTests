@login
@account-management
Feature: Login

    In order to carry out various breeding activities
	As a breeder
	I want to login to the BMS to access the breeding programs I am involved with

@TestCaseKey=IBP-T3153
@sanity-test
@smoke-test
@clean-install
@update-install
    Scenario: Launch BMS      
        Given I navigate to BMS login page
        Then BMS login screen will display

@TestCaseKey=IBP-T3155
@sanity-test
@smoke-test
@clean-install
@update-install
    Scenario: Login as an admin
        Given I navigate to BMS login page
        When I enter valid user credentials
        And I click login
        Then Dashboard page will display

@TestCaseKey=IBP-T3154
@sanity-test  
@clean-install
@update-install   
    Scenario: Check BMS version on login page
        Given I navigate to BMS login page
        Then The BMS login should have the correct version



        