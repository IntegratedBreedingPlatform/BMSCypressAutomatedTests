import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from "../../../pageobjects/germplasm-lists/germplasm-lists-page";
import AddEntryDetailsContext from "../add-entry-details/add-entry-details.context";
import GermplasmListRemoveEntriesPage from '../../../pageobjects/germplasm-lists/germplasm-list-remove-entries-page';
import { randomString } from '../../../../support/commands';

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListRemoveEntriesPage = new GermplasmListRemoveEntriesPage();;
const searchPage = new GermplasmListsBetaPage();

var listName: string;

And('I open an existing list', () => {
    searchPage.selectListFilteredByNumberOfEntries();
});

When('I select random entries in the list', () => {
    germplasmListPage.selectRandomEntries();
});

And('I click Remove entries', () => {
    germplasmListPage.openGermplasmListAction("removeEntriesButton");
});

Then('I should see a message that entries are removed successfully', () => {
    germplasmListRemoveEntriesPage.clickRemoveEntriesConfirm();
    germplasmListRemoveEntriesPage.verifySuccessRemoveEntries();
});

When('I select all entries in the current page', () => {
    germplasmListPage.selectAllEntriesCurrentPage();
});

When('I filter the records by GID and select the entries', () => {
    germplasmListPage.filterByGid();
    germplasmListPage.selectAllEntriesCurrentPage();
});

And('I click Cancel in the Remove entries page', () => {
    germplasmListRemoveEntriesPage.clickRemoveEntriesCancel();
});

Then('the Remove entries page closes', () => {
    germplasmListRemoveEntriesPage.verifyModalClosed();
});
