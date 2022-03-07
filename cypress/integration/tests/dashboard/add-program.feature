@add-program
@dashboard
Feature: Add Program

    In order to carry out various breeding activities
	As a user
	I should be able to add a new program
@ignore   
@TestCaseKey=IBP-T3156    
@smoke-test
@sanity-test
@clean-install
    Scenario: Add a new program      
        Given I am already logged in to BMS
        When I navigate to Add Program page
        And I select a crop name
        And I enter a program name
        And I enter a program start date
        And I save program details
        Then A success message should display
