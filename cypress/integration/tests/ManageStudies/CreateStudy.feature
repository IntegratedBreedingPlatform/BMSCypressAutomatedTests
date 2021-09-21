@create-study
@manage-studies
Feature: Create Study
    In order to perform breeding activities
    As a breeder
    I should be able to create a study

@TestCaseKey=IBP-T511
@sanity-test
@clean-install
Scenario: Create trial using randomized complete block design with treatment factor
    Given I am on the Manage Studies page
    When I click on Start a New study button
    And I enter valid study name, description and objective
    And I select trial from study type dropdown
    And I add a study settings <study_settings_variable>
    And I select a value
    And I save the study
    And I browse a germplasm list for the study
    And I add treatment factor <treatment_factor_variable> and specify its details to the study 
    And I add environment instance to the study
    And I add environment detail <env_detail_variable>
    And I add environment condition <env_condition_variable>
    And I generate design of the study using Randomized Complete Block design
    Then Design generation should be successful 

    Examples:

    |study_settings_variable|treatment_factor_variable|env_detail_variable|env_condition_variable|
    |PI_NAME|NFert_kg_ha|Crop_season_Code|SITE_SOIL_PH|
