Feature: Check pedigree tree
    @TestCaseKey=IBP-T3178
    Scenario: Check pedigree tree
        
        Given I am already logged in to BMS
        When I launch a program
        And I expand GERMPLASM category
        And I navigate to Manage Germplasm page
        And I click on the GID of a germplasm
        And I navigate to Pedigree tab of germplasm details
        Then I should be able to see the pedigree tree