@create-study
@manage-studies
Feature: Create Study
    In order to perform breeding activities
    As a user
    I should be able to create a study

@TestCaseKey=IBP-T511  
@sanity-test
@update-install    
 Scenario: Check creation of trial using randomized complete block design with treatment factors
    Given I am on the Manage Studies page
    And I created a new study with basic details
    When I added study settings
    And I browsed germplasm list 
    And I added treatment factors
    And I added environment variables
    And I generated experimental design using Randomized Complete Block design
    Then Design generation should be successful 
    #Check success message of design generation

@TestCaseKey=IBP-T2352
@sanity-test
@clean-install 
Scenario: Check if design generation fails on BMS with no BV license
    Given I am on the Manage Studies page
    And I created a new study with basic details
    When I generated experimental design using Randomized Complete Block design
    Then Design generation should not be successful 