@user-profile
@account-management
Feature: User Profile

@TestCaseKey=IBP-T2819
@smoke-test
Scenario: Check if user can update user profile
    Given I am already logged in to BMS
    When I navigate to update user profile screen
    And I update my existing details
    And I enter valid password
    Then The update of user profile should succeed
    # NOTE: Assert success message and changes applied on the update profile screen