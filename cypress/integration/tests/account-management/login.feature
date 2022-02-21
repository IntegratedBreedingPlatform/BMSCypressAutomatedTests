@login
@account-management
Feature: Login

    In order to carry out various breeding activities
	As a user
	I want to login to the BMS to access the breeding programs I am involved with

@TestCaseKey=IBP-T3153
@sanity-test
@smoke-test
@clean-install
@update-install
    Scenario: Launch BMS      
        Given I navigate to the BMS login page
        Then The BMS login page should display

@TestCaseKey=IBP-T3155
@sanity-test
@smoke-test
@clean-install  
@update-install
    Scenario: Login as an admin
        Given I navigate to the BMS login page
        When I enter valid user credentials
        And I click login
        Then The Dashboard page should display

@TestCaseKey=IBP-T78
@smoke-test
    Scenario: Check if user can sign out in BMS
        Given I am already logged in to BMS
        When I sign out
		Then I should be redirected to the login page

@TestCaseKey=IBP-T3154
@sanity-test  
@clean-install
@update-install   
    Scenario: Check BMS version on login page
        Given I navigate to the BMS login page
        Then The BMS login should have the correct version


        