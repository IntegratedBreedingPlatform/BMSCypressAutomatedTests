@inline-edit-observation
@manage-studies
Feature: Inline Edit Observation
    In order to perform breeding activities
    As a user
    I should be able to inline edit an observation

Background: 
    Given I am on the Manage Studies page of specified program
    And I opened a study with RCBD design

@TestCaseKey=IBP-T3495
@smoke-test
Scenario Outline: Check inline edit of an observation for trait
    And I add <traitName> trait to the study
    When I inline edit a value of <value> for the <dataType> trait <traitName> with id <traitId>
    Then observation value <value> for the <dataType> trait with id <traitId> should be saved

Examples:
    |value|traitName|dataType|traitId|
    |3|AleuCol_E_1to5|categorical|51547|
    |11.5|Aflatox_M_ppb|numeric|20369|
    |20220214|GermiTest_date|date|8630|
    |Sample Notes|NOTES|character|8390|


@TestCaseKey=IBP-T3495
Scenario Outline: Check if user can keep an out-of-bound value for a categorical trait
    And I add <traitName> trait to the study
    When I inline edit an observation for trait <traitName> with id <traitId> using an out-of-bound value <value>
    And I confirm to keep the value
    Then out-of-bound value <value> for trait <traitName> with id <traitId> should be saved

Examples:
    |traitName|traitId|value|
    |AntAnCol_E_1to5|51492|8|


@TestCaseKey=IBP-T3495
Scenario Outline: Check if user can discard an out-of-bound value for a categorical trait
    And I add <traitName> trait to the study
    When I inline edit an observation for trait <traitName> with id <traitId> using an out-of-bound value <value>
    And I confirm to discard the value
    Then out-of-bound value for trait <traitName> with id <traitId> should not be saved

Examples:
    |traitName|traitId|value|
    |BwSpotSev_E_1to5|20374|8|

