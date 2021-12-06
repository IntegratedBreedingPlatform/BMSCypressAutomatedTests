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
    const fileName = 'GermplasmListImport.xls';
    importModal.selectFile(listName, fileName);
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
    const fileName = 'GermplasmListImportTemplate.xls';
    searchPage.verifyImportTemplateDownload(fileName);
});

// Cancel import
And('I click the Cancel button', () => {
    importModal.cancelImport();
});
Then('the system closes the Import List screen', () => {
    searchPage.verifyImportCancelled();
});

// Validate required columns
When('I click Import List in the Actions menu', () => {
    searchPage.openImportGermplasmListModal();
});
And('I import a valid file with no required columns', () => {
    const fileName = 'GermplasmListImportBadHeader.xls';
    importModal.selectFile(listName, fileName);
});
And('I click Next on Import Germplasm list screen', () => {
    importModal.clickImportNext();
});
Then('I should be able to see error message that the file has no required columns', () => {
    searchPage.verifyErrorMessage('At least GID, GUID or DESIGNATION column is required');
});

// Checks value is present
When('I click Import List in the Actions menu', () => {
    searchPage.openImportGermplasmListModal();
});
And('I select a file to upload without data', () => {
    const fileName = 'GermplasmListImportEmpty.xls';
    importModal.selectFile(listName, fileName);
});
And('I click Next on Import Germplasm list screen', () => {
    importModal.clickImportNext();
});
Then('I should be able to see error message that there are no data to import', () => {
    searchPage.verifyErrorMessage('Wrong name for Observation sheet or the file has no data. Please verify and try again');
});
