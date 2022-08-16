@sample-lists
@browse-sample-list
Feature: Browse Sample List
  In order to see samples 
  As a user
  I should be able to browse sample list

Background:
  Given sample lists already exists
  And I am on the Sample Lists page of specified program

@TestCaseKey=IBP-T109
@smoke-test
Scenario: Verify if user can browse a sample list
  When I browse and select a sample list
  Then I should be able to see the details of the sample list
  #Assert if sample list title and sample list headers displayed