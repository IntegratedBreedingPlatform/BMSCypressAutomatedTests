Feature: Check pedigree graph
    @TestCaseKey=IBP-T3180
    Scenario: Check pedigree graph
        
        Given I am already logged in to BMS
        When I launch a program
        And I expand GERMPLASM category
        And I navigate to Manage Germplasm page
        And I click on the GID of a germplasm
        And I navigate to Pedigree tab of germplasm details
        And I click View Pedigree Graph button
        Then I should be able to see the pedigree graph