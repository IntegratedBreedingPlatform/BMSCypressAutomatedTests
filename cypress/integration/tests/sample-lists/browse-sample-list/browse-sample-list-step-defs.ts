import { When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import SampleListPage from '../../../pageobjects/studies/sample-list-page';

const sampleListPage = new SampleListPage();
const listName = 'SampleList' + randomString();

And('I create a genotyping sample list for the study',  () => {
    sampleListPage.createGenotypeSamples('nEarsSel', listName);
});

When('I browse and select a sample list',  () => {
    sampleListPage.browseAndSelectList(listName);
});

Then('I should be able to see the details of the sample list',  () => {
    sampleListPage.verifyListDetails(listName);
});
