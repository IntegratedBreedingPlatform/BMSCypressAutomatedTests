import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';
import ImportFileNames from '../../../constants/import-filenames';

const searchPage = new GermplasmListsBetaPage();
let importModal = new GermplasmListImportPage();
const listName = 'list name ' + randomString();

// Import list
When('I navigate to import list screen', () => {
    searchPage.openImportGermplasmListModal();
});
And('I select a file to upload', () => {
    importModal.selectFile(ImportFileNames.LIST_IMPORT_VALID);
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
});
When('I select a file with no required columns', () => {
    importModal.selectFile(ImportFileNames.LIST_IMPORT_NO_REQUIRED_COLS);
});
When('I select a file with no values', () => {
    importModal.selectFile(ImportFileNames.LIST_IMPORT_NO_VALUES);
});
When('I selected a file with single match', () => {
    importModal.selectFile(ImportFileNames.LIST_IMPORT_SINGLE_MATCH);
});
When('I selected a file with multiple matches', () => {
    importModal.selectFile(ImportFileNames.LIST_IMPORT_MULTIPLE_MATCHES);
});
When('I skip data with multiple matches', () => {
    importModal.skipMultimatch();
});
Then('I should see the error message that the file has no required columns', () => {
    importModal.verifyError("At least GID, GUID or DESIGNATION column is required");
});
Then('I should see the error message that the file has no data', () => {
    importModal.verifyError("Wrong name for Observation sheet or the file has no data. Please verify and try again");
});
// Download template
When('I select Import germplasm list from Actions', () => {
    searchPage.openImportGermplasmListModal();
});
And('I click the link to dowload the import list template', () => {
    importModal.openImportListClickTemplate();
});
Then('An import list template should be downloaded', () => {
    searchPage.verifyImportTemplateDownload(ImportFileNames.GERMPLASM_IMPORT_TEMPLATE);
});

// Cancel import
And('I cancel the import of list', () => {
    importModal.cancelImport();
});
Then('the system closes the Import List screen', () => {
    searchPage.verifyImportCancelled();
});
