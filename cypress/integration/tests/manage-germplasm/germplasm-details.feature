@germplasm-details
@manage-germplasm
Feature: Germplasm Details
    In order to know the details of a germplasm
    As a user
    I should be able to view details of a germplasm

@TestCaseKey=IBP-T3178
@sanity-test
@clean-install
    Scenario: Check pedigree 
        Given germplasm records already exists
        And I am on the Manage Germplasm page of specified program
        When I click on the GID of a germplasm
        And I navigate to the Pedigree tab of germplasm details
        Then I should be able to see the pedigree tree
@TestCaseKey=IBP-T3178
@sanity-test
@update-install
    Scenario: Check pedigree 
        Given I am on the Manage Germplasm page of specified program
        When I click on the GID of a germplasm
        And I navigate to the Pedigree tab of germplasm details
        Then I should be able to see the pedigree tree        

@TestCaseKey=IBP-T3180
@sanity-test
@clean-install
    Scenario: Check pedigree graph
        Given germplasm records already exists
        And I am on the Manage Germplasm page of specified program
        When I click on the GID of a germplasm
        And I navigate to the Pedigree tab of germplasm details
        And I click View Pedigree Graph button
        Then I should be able to see the pedigree graph

@TestCaseKey=IBP-T3180
@sanity-test
@update-install
    Scenario: Check pedigree graph
        Given I am on the Manage Germplasm page of specified program
        When I click on the GID of a germplasm
        And I navigate to the Pedigree tab of germplasm details
        And I click View Pedigree Graph button
        Then I should be able to see the pedigree graph