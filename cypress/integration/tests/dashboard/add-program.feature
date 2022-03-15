@add-program
@dashboard
Feature: Add Program

    In order to carry out various breeding activities
	As a user
	I should be able to add a new program

@TestCaseKey=IBP-T3156    
@sanity-test
@clean-install
    Scenario: Add a new program      
        Given I am already logged in to BMS
        When I navigate to Add Program page
        And I select a crop name
        And I enter default program name
        And I enter a program start date
        And I save program details
        Then A success message should display

@TestCaseKey=IBP-T3156    
@smoke-test
    Scenario: Add a new program      
        Given I am already logged in to BMS
        When I navigate to Add Program page
        And I select a crop name
        And I enter new program name
        And I enter a program start date
        And I save program details
        Then A success message should display
#Note: The scenarios above are duplicated to be able to include add program
# when running TAGS=(@smoke-test) and not @ignore and not @clean-install