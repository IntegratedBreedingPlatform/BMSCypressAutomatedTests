Feature: Import new germplasm records
    @TestCaseKey=IBP-T3177
    Scenario: Import new germplasm records
        
        Given I am already logged in to BMS
        When I launch a program
        And I expand GERMPLASM category
        And I navigate to Manage Germplasm page
        And I select Import germplasm from Actions
        And I Select file to upload
        And I click Next on import germplasm screen
        And I click Next on create inventory screen
        And I click Save on review germplasm screen
        Then Saving of germplasm succeeds