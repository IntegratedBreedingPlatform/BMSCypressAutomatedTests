import { Given, And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from "../../../pageobjects/germplasm-lists/germplasm-lists-page";
import AddEntryDetailsContext from "../add-entry-details/add-entry-details.context";
import GermplasmListAddToListPage from '../../../pageobjects/germplasm-lists/germplasm-list-add-to-list-page';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';
import { randomString } from '../../../../support/commands';

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListAddToListPage = new GermplasmListAddToListPage();;
const searchPage = new GermplasmListsBetaPage();
let importModal = new GermplasmListImportPage();

var listName: string;

And('I import a list to add entries to', () => {
    listName = 'list name ' + randomString();

    searchPage.openImportGermplasmListModal();
    importModal.importNewList(listName);
});

Given('I open an existing list', () => {
    searchPage.selectListFilteredByNumberOfEntries();
});

Given('I lock the imported list', () => {
    searchPage.selectListFilteredByListName(listName);
    germplasmListPage.lockList();
});

When('I select some entries in the current page', () => {
    germplasmListPage.selectRandomEntries();
});

When('I select all entries from the current page', () => {
    germplasmListPage.selectAllEntriesCurrentPage();
});

When('I filter an entry by GID and select the entries', () => {
    germplasmListPage.filterByGid();
    germplasmListPage.selectAllEntriesCurrentPage();
});

When('I select the same entry that exists in the list', () => {
    // add all entries in current page to list (to be added again on the next step)
    germplasmListPage.selectAllEntriesCurrentPage();
    germplasmListPage.openAddToList();
    germplasmListAddToListPage.selectExistingList(listName);
    germplasmListAddToListPage.clickAddToListConfirm();
    germplasmListAddToListPage.verifySuccessAddToList();
});

And('I select germplasm list in the add entries to list screen', () => {
    germplasmListPage.openAddToList();
    germplasmListAddToListPage.selectExistingList(listName);
    germplasmListAddToListPage.clickAddToListConfirm();
});

Then('I should see a message that entries are added successfully', () => {
    germplasmListAddToListPage.verifySuccessAddToList();
});

Then('I should see a message that the germplasm list is locked', () => {
    germplasmListAddToListPage.verifyListIsLocked();
});
