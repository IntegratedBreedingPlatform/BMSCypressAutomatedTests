import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';

const searchPage = new GermplasmListsBetaPage();
let importModal = new GermplasmListImportPage();
const listName = 'list name ' + randomString();

// Import list
When('I select Import germplasm list from Actions', () => {
    searchPage.openImportGermplasmListModal();
});
And('I select a file to upload', () => {
    importModal.selectFile(listName);
});
And('I click Next on Import Germplasm list screen', () => {
    importModal.clickImportNext();
});
And('I click Next on Review Import List screen', () => {
    importModal.clickImportSubmit();
});
And('I select the first match on Select Match screen', () => {
    importModal.selectFirstMatch();
});
And('I click Confirm on Import List Summary screen', () => {
    importModal.clickImportConfirm();
});
And('I click Confirm on Save Germplasm List screen', () => {
    importModal.clickSaveList(listName);
});
Then('the created list is available and filtered', () => {
    importModal.verifyListCreated(listName);
})

// Download template
When('I select Import germplasm list from Actions', () => {
    searchPage.openImportGermplasmListModal();
});
And('I click the link to dowload the import list template', () => {
    importModal.openImportListClickTemplate();
});
Then('An import list template should be downloaded', () => {
    searchPage.verifyImportTemplateDownload();
});

// Cancel import
And('I click the Cancel button', () => {
    importModal.cancelImport();
});
Then('the system closes the Import List screen', () => {
    searchPage.verifyImportCancelled();
});
