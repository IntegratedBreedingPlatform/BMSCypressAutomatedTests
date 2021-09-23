@release-notes
@dashboard
Feature: Release Notes
  In order to see the latest changes on BMS
  As a breeder
  I should be able to see the release notes pop-up

@TestCaseKey=IBP-T3185
@clean-install
      Scenario: Check display of release notes  
        Given I am already logged in to BMS
        When Release Notes pop-up displays
        And I click OK
        Then Release Notes pop-up closes

        