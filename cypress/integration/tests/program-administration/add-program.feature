@sidebar
Feature: Add Program
    In order to add a program in BMS
    As a breeder
    I should be able to create a program record

@TestCaseKey=IBP-T91
@sanity-test
@smoke-test
@clean-install
Scenario: Add a new program
    Given I am already logged in to BMS
    When I click Add a Program
    And I select a Crop Name
    And I enter a Program Name
    And I click Save on Add a Program screen
    Then adding of a program succeeds
