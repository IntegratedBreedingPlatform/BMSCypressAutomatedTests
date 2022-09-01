@sample-lists
@browse-sample-list
Feature: Browse Sample List
  In order to see samples 
  As a user
  I should be able to browse sample list

Background:
  Given I am on the Manage Studies page of specified program
  And I opened a study with RCBD design
  And I add nEarsSel selection to the study with observations
  And I click Create genotyping samples action
  And I create a genotyping sample list for the study
  And I am on the Samples Lists page of specified program

@TestCaseKey=IBP-T109
@smoke-test
Scenario: Verify if user can browse a sample list
  When I browse and select a sample list
  Then I should be able to see the details of the sample list
  #Assert if sample list title and sample list headers displayed
