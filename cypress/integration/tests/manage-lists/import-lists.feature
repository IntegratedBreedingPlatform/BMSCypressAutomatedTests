@manage-lists
@import-lists
Feature: Import Lists
    In order to find germplasm using different criteria and enable the user to resolve conflicts
    As a user
    I should be able to import germplasm lists

Scenario: Check if Import Lists is available in Manage Lists module
Given I am on the Manage Lists page
When I click the Actions menu
Then I should see Import List from Actions

Scenario: Check if user can download import lists template
Given I am on the Manage Lists page
And I click Import List in the Actions menu
When I download the import list template
tapos Then An import list template should be downloaded

Scenario: Check if user cancels import lists
Given I am on the Manage Lists page
And I click Import List in the Actions menu
And select a valid file to upload in the Import List screen
When I upload the file
And click the Cancel button
Then the system closes the Import List screen

Scenario: Check if List File Importer validates required columns
Given I am on the Manage Lists page
And I click Import List in the Actions menu
When I import a valid file with no required columns
Then I should be able to see error message that the file has no required columns
# NOTE: Add assertion to check if the following columns exist: GID, GUID, DESIGNATION

Scenario: Check if List File Importer checks value is present in the required columns
Given I am on the Manage Lists page
And I click Import List in the Actions menu
When I import a valid file with no required columns
Then the system checks that the file has the required columns
# NOTE: Add assertion to check if the following columns exist: GID, GUID, DESIGNATION
Then I should be able to see error message that there is no value in one of the required columns
# NOTE: Add assertion to check if no value is present in one of the columns

# Add before-hook: @import-germplasm.feature

Scenario: Check if user can review list and skip multiple matches
Given I imported a valid file with multiple matches
# Note: File has entries with multiple existing entries included. Add values to check GUID, GID, DESIGNATION search prioritization
And I am presented with the Review Import List screen
When I skip data with multiple matches
Then I should be able to save the germplasm list
# Add assertion to check the valid list metadata (name, description, etc) and folder. 
# And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file
# Add assertion to check that the entries with multiple matches are not included in the saved list

Scenario: Check if user can review list and skip without matches
Given I imported a valid file with without matches
# Note: File has non-existing entries included
And I am presented with the Review Import List screen
When I skip data without matches
Then I should be able to save the germplasm list
# Add assertion to check the valid list metadata (name, description, etc) and folder. 
# And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file
# Add assertion to check that the entries with without matches are not included in the saved list

Scenario: Check if user can review list and omit selected entries
Given I imported a valid file with without matches
# Note: File has non-existing entries included
And I am presented with the Review Import List screen
When I navigate to Select match screen
And I select entries to omit
Then I should be able to save the germplasm list with omitted entries
# Note: Add asserting to check the valid list metadata (name, description, etc) and folder. 
# And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.
# Add assertion to check that the omitted entries are not in the saved list

@TestCaseKey=IBP-T3214
@smoke-test
Scenario: Check if user can review list and manually match selected entries
Given I imported a valid file with multiple matches
# Note: File has entries with multiple existing entries included. Add values to check GUID, GID, DESIGNATION search prioritization
And I am presented with the Review Import List screen
When I navigate to Select match screen
And I select match entries
Then I should be able to save the germplasm list with the matched entries
# Note: Add assertion to check the status of the matched entries
# Add asserting to check the valid list metadata (name, description, etc) and folder. 
# And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.
# Add assertion to check that the matched entries are included in the saved list

Scenario: Check if user can review list and proceed with missing matches entries
Given I imported a valid file with missing matches
# Note: File has non-existing entries included
And I am presented with the Review Import List screen
When I navigate to Select match screen
And I did not select any entries
Then I should be able to save the germplasm list without the entries with missing matches
# Note: Add asserting to check the valid list metadata (name, description, etc) and folder. 
# And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.
# Add assertion to check that the entries with missing entries are not in the saved list