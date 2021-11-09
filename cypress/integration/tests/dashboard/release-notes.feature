@release-notes
@dashboard
Feature: Release Notes
  In order to be informed of the changes of the new BMS version at login
  As a user
  I should be able to see the release notes pop-up

@ignore
@TestCaseKey=IBP-T3185
@clean-install
@update-install
      Scenario: Check display of release notes  
        # Pre-condition
        # The BMS has been upgraded
        # And the user haven't logged in yet in the new version
        Given I am already logged in to BMS
        Then Release Notes pop-up displays

@ignore        
@TestCaseKey=IBP-T3185
@clean-install
@update-install        
      Scenario: Check if release notes displays when unchecked Don't show again
        Given I am already logged in to BMS
        And I am presented with the release notes pop-up
        When I uncheck the Don't show again checkbox
        And I click OK
        And I re-log in the system
        Then I should see the release notes pop-up again

@ignore        
@TestCaseKey=IBP-T3185
@clean-install
@update-install
      Scenario: Check if release notes no longer shows when checked Don't show again
        Given I am already logged in to BMS
        And I am presented with the release notes pop-up
        When I check the Don't show again checkbox
        And I click OK
        And I re-log in the system
        Then I should no longer see the release notes pop-up