import { Given, And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from "../../../pageobjects/germplasm-lists/germplasm-lists-page";
import AddEntryDetailsContext from "../add-entry-details/add-entry-details.context";
import GermplasmListDeleteListPage from '../../../pageobjects/germplasm-lists/germplasm-list-delete-list-page';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';
import { randomString } from '../../../../support/commands';
import ImportFileNames from '../../../constants/import-filenames';

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListDeleteListPage = new GermplasmListDeleteListPage();
const searchPage = new GermplasmListsBetaPage();
const importModal = new GermplasmListImportPage();

var listName: string;

And('I import a list to delete', () => {
    listName = 'list name ' + randomString();

    searchPage.openImportGermplasmListModal();
    importModal.importNewList(listName,ImportFileNames.LIST_IMPORT_VALID);
    searchPage.selectListFilteredByListName(listName);
});

When('I click Delete list', () => {
    germplasmListPage.deleteList();
});

And('I click confirm in the delete germplasm list screen', () => {
    germplasmListDeleteListPage.clickDeleteListConfirm();
});

Then('I should see a message that the list is deleted successfully', () => {
    germplasmListDeleteListPage.verifySuccessDeleteList();
});

And('the list is no longer available', () => {
    searchPage.filterAndVerifyResult(listName, 'exist');
});

And('I click Cancel in the delete germplasm list screen', () => {
    germplasmListDeleteListPage.clickDeleteListCancel();
});

Then('the delete germplasm list screen closes', () => {
    germplasmListDeleteListPage.verifyModalClosed();
});

And('the list is not deleted', () => {
    searchPage.filterAndVerifyResult(listName, 'not.exist');
});

When('I lock the list', () => {
    germplasmListPage.lockList();
});

Then('the Delete list is not available', () => {
    germplasmListDeleteListPage.verifyListIsLocked();
});
