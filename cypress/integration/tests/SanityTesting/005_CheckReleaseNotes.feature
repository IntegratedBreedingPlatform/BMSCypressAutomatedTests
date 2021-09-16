Feature: Check display of release notes
    @TestCaseKey=IBP-T3185
    Scenario: Check display of release notes
        
        Given I am already logged in to BMS
        When Release Notes pop-up displays
        And I check Don't show again checkbox
        And I click OK
        Then Release Notes pop-up closes