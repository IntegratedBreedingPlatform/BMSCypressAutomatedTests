import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';

const searchPage = new GermplasmListsBetaPage();
let importModal = new GermplasmListImportPage();
const listName = 'list name ' + randomString();

When('I select Import germplasm list from Actions', () => {
    searchPage.openImportGermplasmListModal();
});
When('I select a file to upload', () => {
    importModal.selectFile(listName);
});
When('I click Next on Import Germplasm list screen', () => {
    importModal.clickImportNext();
});
When('I click Next on Review Import List screen', () => {
    importModal.clickImportSubmit();
});
When('I click Confirm on Import List Summary screen', () => {
    importModal.clickImportConfirm();
});
When('I click Confirm on Save Germplasm List screen', () => {
    importModal.clickSaveList(listName);
});
Then('the created list is available and filtered',()=>{
    importModal.verifyListCreated(listName);
})
