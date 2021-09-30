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
And the system validates that there is a value for a least one these columns
*NOTE: Add assertion to check if no value is present in one of the columns


Scenario: Check if user can review list and skip multiple matches
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import list screen
When I upload the file
*Note: File has entries with multiple existing entries included. Add values to check GUID, GID, DESIGNATION search prioritization
And click the Next button
And click Skip data with multiple matches in the Review Import List screen
Then system skips the entries with multiple matches and successfully import the germplasm list

Scenario: Check if user can review list and skip no matches
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import list screen
When I upload the file
*Note: File has invalid entries included. Add values to check GUID, GID, DESIGNATION search prioritization
And click the Next button
And click Skip data with no matches in the Review Import List screen
Then system skips the entries with no matches and successfully import the germplasm list
*Note: Navigate to other page and check pagination is working properly
*Add asserting to check the valid list metadata (name, description, etc) and folder. 
*And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.

Scenario: Check if user can review list and skip no matches
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import list screen
When I upload the file
And click the Next button
And click Skip data with no matches in the Review Import List screen
Then system skips the entries with no matches and successfully import the germplasm list
*Note: Add asserting to check the valid list metadata (name, description, etc) and folder. 
*And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.

Scenario: Check if user can review list and omit selected entries
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import list screen
When I upload the file
*Note: File has invalid entries included
And click the Next button
And click Next button in the Review Import List screen
And select entries in the Select match
And click Omit button
Then system omits the entries and successfully import the germplasm list
*Note: Add asserting to check the valid list metadata (name, description, etc) and folder. 
*And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.


Scenario: Check if user can review list and manually match selected entries
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import list screen
When I upload the file
*Note: File has invalid entries included
And click the Next button
And click Next button in the Review Import List screen
And select entries in the Select match screen
And select match entries
And click Next button in the Select match screen
Then system will match entries and successfully import the germplasm list
*Note: Add assertion to check the status of the matched entries
*Add asserting to check the valid list metadata (name, description, etc) and folder. 
*And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.

Scenario: Check if user can review list and proceed with no matches entries
Given I am already logged in to BMS
And I navigate to Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import list screen
When I upload the file
And click the Next button
And click Next button in the Review Import List screen
And click Next button in Select match screen
Then system omits the entries and successfully import the germplasm list
*Note: Add asserting to check the valid list metadata (name, description, etc) and folder. 
*And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.