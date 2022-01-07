import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmSelectorPage from '../../../pageobjects/germplasm/germplasm-selector-page';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from "../../../pageobjects/germplasm-lists/germplasm-lists-page";
import AddEntryDetailsContext from "../add-entry-details/add-entry-details.context";

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const searchPage = new GermplasmListsBetaPage();
const germplasmSelectorPage = new GermplasmSelectorPage();

And('I open an existing list', () => {
    searchPage.openGermplasmList();
});

When('I navigate to add new entries screen', () => {
    germplasmListPage.openAddNewEntries();
    germplasmSelectorPage.verifyGermplasmSelectorModalIsShown();
});

And('I select all entries and add to the list', () => {
    // Get the old total count first so we can compare the new total count after the entries
    // are added.
    germplasmListPage.getTotalCount();
    germplasmSelectorPage.selectAllPages();
    germplasmSelectorPage.clickSelectButton();
});

And('I select random entries and add to the list', () => {
    // Get the old total count first so we can compare the new total count after the entries
    // are added.
    germplasmListPage.getTotalCount();
    germplasmSelectorPage.selectRandomEntries();
    germplasmSelectorPage.clickSelectButton();
});

And('I select all entries on the current page and add to the list', () => {
    // Get the old total count first so we can compare the new total count after the entries
    // are added.
    germplasmListPage.getTotalCount();
    germplasmSelectorPage.selectAllEntriesCurrentPage();
    germplasmSelectorPage.clickSelectButton();
});

And('I filter an entry by GID and add to the list', () => {
    // Get the old total count first so we can compare the new total count after the entries
    // are added.
    germplasmListPage.getTotalCount();
    germplasmSelectorPage.filterByGIDs([1, 2, 3]);
    germplasmSelectorPage.selectAllEntriesCurrentPage();
    germplasmSelectorPage.clickSelectButton();
});

And('I filter for an entry that exists in the list and add again to the list', () => {
    // Get the old total count first so we can compare the new total count after the entries
    // are added.
    germplasmListPage.getTotalCount();
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

