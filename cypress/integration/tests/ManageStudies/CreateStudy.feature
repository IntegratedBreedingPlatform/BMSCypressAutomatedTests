@create-study
@manage-studies
Feature: Create Study
    In order to perform breeding activities
    As a breeder
    I should be able to create a study

@sanity-test
@clean-install
Scenario: Create trial with basic details
    Given I am on the Manage Studies page
    When I click on Start a New study button
    And I enter valid study name, description and objective
    And I select trial from study type dropdown
    And I save the study in a folder
    Then Saving of the study should be successful
    #Check success message and display of other tabs on the study
@sanity-test
@clean-install 
Scenario Outline: Add study settings variable to a study    
    Given I am on the Manage Studies page
    When I open a study I created with basic details
    And I navigate to Settings tab
    And I add the study settings variable <study_settings_variable>

    And I specify a value
    And I save the study
    Then Saving of the study should be successful
    #Check success message and if the "unsaved data" no longer displays on the study

Examples:
    |study_settings_variable|
    |PI_NAME|
@sanity-test
@clean-install
Scenario Outline: Browse germplasm list for a study
    Given I am on the Manage Studies page
    When I open a study I created with basic details
    And I navigate to Germplasm & Checks tab
    And I browse a germplasm list for the study
    Then The germplasm list should be succesfully loaded on the Study
    #Check display of germplasm records table
@sanity-test
@focus @clean-install
Scenario Outline: Add environment variables to a study    
    Given I am on the Manage Studies page
    When I open a study I created with basic details
    And I navigate to Environments tab
    And I add environment to the study
    And I add the environment detail variable <env_detail_variable>
    And I add the environment condition variable <env_condition_variable>
    Then The variables added should be present on the environments table
    
Examples: 
    |env_detail_variable|env_condition_variable|
    |Crop_season_Code|SITE_SOIL_PH|

@TestCaseKey=IBP-T511  
@sanity-test
@clean-install    
 Scenario Outline: Add treatment factors to a study and generate RCBD design
    Given I am on the Manage Studies page
    When I open a study I created with basic details and germplasm list
    And I navigate to Treatment Factors tab
    And I add the treatment factor variable <treatment_factor_variable> 

    And I select the label <treatment_label>
    And I specify the number of treatments
    And I specify the values for each treatment 
    And I navigate to Experimental Design tab
    And I select Randomized Complete Block Design
    And I specify starting plot number
    And I specify no. of replications
    And I generate design
    Then Design generation should be successful 
    #Check success message of design generation

Examples:
    |treatment_factor_variable|treatment_label|
    |NFert_kg_ha|NFERT_NO|

Scenario: Check if design generation fails on BMS with no BV license
    Given I am on the Manage Studies page
    When I open a study I created with basic details and germplasm list
    And I select Randomized Complete Block Design
    And I specify starting plot number
    And I specify no. of replications
    And I generate design
    Then Design generation should not be successful 
