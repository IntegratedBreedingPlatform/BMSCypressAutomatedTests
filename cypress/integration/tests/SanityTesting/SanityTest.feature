Feature: SanityTest

Scenario: Verify BMS tag version on login page
Given I navigate to BMS login screen
Then The BMS login should have the correct tag version


Scenario: Verify BMS tag version on sidebar
Given I navigate to BMS login screen
When I login as an admin
And I launch a program
Then The BMS sidebar should have the correct tag version

Scenario: Verify creation of a program
Given I navigate to BMS login screen
When I login as an admin
And I navigate to Add a Program page
And I select a "crop" name
|crop|
|maize|
And I enter a "program" name
|program|
|MyProgram|
And I clicked Save
Then A success message saying the program has been sucessfully created displays
