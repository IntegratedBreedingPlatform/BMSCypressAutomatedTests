@create-study
@manage-studies
Feature: Create Study
    In order to perform breeding activities
    As a user
    I should be able to create a study

@TestCaseKey=IBP-T511  
@smoke-test
Scenario: Check creation of trial using randomized complete block design with treatment factors
    Given I am on the Manage Studies page
    When I created a new study with basic details
    And I added study settings
    And I browsed germplasm list 
    And I added treatment factors
    And I added environment variables
    And I generated experimental design using Randomized Complete Block design
    Then Design generation should be successful 
    #Check success message of design generation 
    
@TestCaseKey=IBP-T2352
@sanity-test
@clean-install 
Scenario: Check BV Design License is not included
    Given I am on the Manage Studies page
    And I created a new study with basic details
    And I browsed germplasm list
    When I try to generate experimental design using Randomized Complete Block design
    Then Design generation should not be successful

@TestCaseKey=IBP-T2359  
@sanity-test
@update-install    
 Scenario: Check BV Design License is included
    Given I am on the Manage Studies page
    And I opened an existing study with germplasm list but with no existing design yet
    When I go to experimental design and generated using Randomized Complete Block design
    Then Design generation should be successful
    And Delete the generated design
    #Check success message of design generation
    #Add deletion of design step on Then step definition


