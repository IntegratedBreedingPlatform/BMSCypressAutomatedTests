import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmSelectorPage from '../../../pageobjects/germplasm/germplasm-selector-page';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from "../../../pageobjects/germplasm-lists/germplasm-lists-page";
import AddEntryDetailsContext from "../add-entry-details/add-entry-details.context";
import { randomString } from '../../../../support/commands';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';
import ImportFileNames from '../../../constants/import-filenames';

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const searchPage = new GermplasmListsBetaPage();
const germplasmSelectorPage = new GermplasmSelectorPage();
let importModal = new GermplasmListImportPage();

var listName: string;

And('I import a list to add entries to', () => {
    listName = 'list name ' + randomString();

    searchPage.openImportGermplasmListModal();
    importModal.importNewList(listName, ImportFileNames.LIST_IMPORT_VALID);
    searchPage.selectListFilteredByListName(listName);
});

When('I navigate to add new entries screen', () => {
    // Get the old total count first so we can compare the new total count after the entries
    // are added.
    germplasmListPage.getTotalCount();
    germplasmListPage.openAddNewEntries();
    germplasmSelectorPage.verifyGermplasmSelectorModalIsShown();
});

And('I select all entries and add to the list', () => {
    germplasmSelectorPage.filterByGIDs([1, 2, 3]);
    germplasmSelectorPage.selectAllPages();
    germplasmSelectorPage.clickSelectButton();
});

And('I select random entries and add to the list', () => {
    germplasmSelectorPage.selectRandomEntries();
    germplasmSelectorPage.clickSelectButton();
});

And('I select all entries on the current page and add to the list', () => {
    germplasmSelectorPage.selectAllEntriesCurrentPage();
    germplasmSelectorPage.clickSelectButton();
});

And('I filter an entry by GID and add to the list', () => {
    germplasmSelectorPage.filterByGIDs([1, 2, 3]);
    germplasmSelectorPage.selectAllEntriesCurrentPage();
    germplasmSelectorPage.clickSelectButton();
});

And('I filter for an entry that exists in the list and add again to the list', () => {
    germplasmSelectorPage.filterByGIDs([1, 2, 3]);
    germplasmSelectorPage.selectAllEntriesCurrentPage();
    germplasmSelectorPage.clickSelectButton();
});

Then('I should see a message that entries are added successfully', () => {
    germplasmListPage.verifySuccessMessage();
});

And('I should be see that the list entries are updated', () => {
    germplasmListPage.verifyTotalCountChanged();
});

