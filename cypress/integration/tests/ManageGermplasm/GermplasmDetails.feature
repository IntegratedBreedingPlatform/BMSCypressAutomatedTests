@germplasm-details
@manage-germplasm
Feature: Germplasm Details
    In order to know the details of a germplasm
    As a breeder
    I should be able to view details of a germplasm

@TestCaseKey=IBP-T3178
@sanity-test
@clean-install
@update-install
    Scenario: Check pedigree tree
        Given I am on Manage Germplasm screen
        And I click on the GID of a germplasm
        And I navigate to the pedigree tab of germplasm details
        Then I should be able to see the pedigree tree

@TestCaseKey=IBP-T3180
@sanity-test
@clean-install
@update-install
    Scenario: Check pedigree graph   
        Given I am on Manage Germplasm screen
        And I click on the GID of a germplasm
        And I navigate to the pedigree tab of germplasm details
        And I click view pedigree graph button
        Then I should be able to see the pedigree graph