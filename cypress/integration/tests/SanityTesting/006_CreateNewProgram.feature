Feature: Create a new program
    @TestCaseKey=IBP-T3156
    Scenario: Create a new program
        
        Given I am already logged in to BMS
        And I navigate to Add a Program page
        And I select a crop name
        And I enter a program name
        And I click Save
        Then A success message saying the program has been sucessfully created displays