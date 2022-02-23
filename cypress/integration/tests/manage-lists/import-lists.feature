@manage-lists
@import-lists
Feature: Import Lists
  In order to find germplasm using different criteria and enable the user to resolve conflicts
  As a user
  I should be able to import germplasm lists

 Background: 
    Given I am on the Germplasm Lists page of specified program

  @smoke-test
  Scenario: Import new germplasm list
    When I navigate to import list screen
    And I select a file to upload
    And I click Next on Import Germplasm list screen
    And I click Next on Review Import List screen
    And I select the first match on Select Match screen
    And I click Confirm on Import List Summary screen
    And I click Confirm on Save Germplasm List screen
    Then the created list is available and filtered

  @ignore
  Scenario: Check if user can download import lists template
    When I navigate to import list screen
    And I click the link to dowload the import list template
    Then An import list template should be downloaded

  @smoke-test
  Scenario: Check if user cancels import lists
    Given I reload the Germplasm Lists page
    When I navigate to import list screen
    And I select a file to upload
    And I cancel the import of list
    Then the system closes the Import List screen
  Scenario: Check validation when user imported list with no required columns
    Given I reload the Germplasm Lists page
    And I navigate to import list screen
    When I select a file with no required columns
    And I click Next on Import Germplasm list screen
    Then I should see the error message that the file has no required columns
  Scenario: Check validation when user imported list with no values
    Given I reload the Germplasm Lists page
    And I navigate to import list screen
    When I select a file with no values
    And I click Next on Import Germplasm list screen
    Then I should see the error message that the file has no data

  Scenario: Check if user can review list and proceed with single matches entries
    Given I reload the Germplasm Lists page
    And I navigate to import list screen 
    And I selected a file with single match
    And I click Next on Import Germplasm list screen
    And I click Next on Review Import List screen
    And I click Confirm on Import List Summary screen
    And I click Confirm on Save Germplasm List screen
    Then the created list is available and filtered
    And the created list has correct list metadata
# Note: Add asserting to check the valid list metadata (name, description, etc) and folder. 
# And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.

# Add before-hook: @import-germplasm.feature
@focus 
  Scenario: Check if user can review list and skip multiple matches
    Given I reload the Germplasm Lists page
    And I navigate to import list screen 
    And I selected a file with multiple matches
    And I click Next on Import Germplasm list screen
# Note: File has entries with multiple existing entries included. Add values to check GUID, GID, DESIGNATION search prioritization
    And I skip data with multiple matches
    And I click Next on Review Import List screen
    And I click Confirm on Import List Summary screen
    And I click Confirm on Save Germplasm List screen
    Then the created list is available and filtered
    Then I should be able to save the germplasm list without the entries with multiple matches
# Add assertion to check the valid list metadata (name, description, etc) and folder. 
# And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file
# Add assertion to check that the entries with multiple matches are not included in the saved list

  @ignore
  Scenario: Check if user can review list and skip without matches
    Given I imported a valid file with entries without matches
    # Note: File has non-existing entries included
    And I am presented with the Review Import List screen
    When I skip data without matches
    Then I should be able to save the germplasm list without the entries with no matches
    # Add assertion to check the valid list metadata (name, description, etc) and folder.
    # And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file
    # Add assertion to check that the entries without matches are not included in the saved list

  @ignore
  Scenario: Check if user can review list and omit selected entries
    Given I imported a valid file with missing matches
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
  @ignore
  Scenario: Check if user can review list and manually match selected entries
    Given I imported a valid file with multiple matches
    # Note: File has entries with multiple existing entries included. Add values to check GUID, GID, DESIGNATION search prioritization
    And I am presented with the Review Import List screen
    When I navigate to Select match screen
    And I manually map a germplasm for the selected record
    Then I should be able to save the germplasm list with the matched entries
    # Note: Add assertion to check the status of the matched entries
    # Add asserting to check the valid list metadata (name, description, etc) and folder.
    # And check if the system assigned correct ENTRY_NOs based on the ordering of entries in the file.
    # Add assertion to check that the matched entries are included in the saved list

  @ignore
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
