Feature: Import Lists
    In order to find germplasm using different criteria and enable the user to resolve conflicts
    As a breeder
    I should be able to import germplasm lists

Scenario: Check if Import Lists is available in Manage Lists module
Given I am already logged in to BMS
And I navigate to Manage Lists page
When I click the Actions menu
Then I should see Import List from Actions

Scenario: Check if user can download import lists template
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
When I click here link in the Import List screen
Then I should be able to download the template

Scenario: Check if user cancels import lists
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import List screen
When I upload the file
And click the Cancel button
Then the system closes the Import List screen

Scenario: Check if List File Importer validates required columns
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import list screen
When I upload the file
And click the Next button
Then the system checks that the file has at least one of the required columns
*NOTE: Add assertion to check if the following columns exist: GID, GUID, DESIGNATION
And the system will validate that there is a value for a least one these columns
*NOTE: Add assertion to check if no value is present in one of the columns
