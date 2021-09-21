@add-program
@dashboard
Feature: Add Program

    In order to carry out various breeding activities
	As a breeder
	I should be able to add a new program
    
@TestCaseKey=IBP-T3156    
@smoke-test
@clean-install
@update-install
    Scenario: Add a new program      
        Given I am already logged in to BMS
        When I navigate to Add Program page
        And I select a crop name
        And I enter a program name
        And I click Save
        Then A success message saying the program has been sucessfully created displays