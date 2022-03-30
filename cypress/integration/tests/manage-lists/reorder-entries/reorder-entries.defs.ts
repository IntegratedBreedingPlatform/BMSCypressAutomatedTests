import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from '../../../pageobjects/germplasm-lists/germplasm-lists-page';
import AddEntryDetailsContext from '../add-entry-details/add-entry-details.context';
import GermplasmListReorderEntriesPage from '../../../pageobjects/germplasm-lists/germplasm-list-reorder-entries-page';

const searchPage = new GermplasmListsBetaPage();

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListReorder = new GermplasmListReorderEntriesPage();

And('I open an existing list', () => {
    searchPage.selectListFilteredByNumberOfEntries();
});

When('I select a germplasm entry', () => {
    germplasmListReorder.selectRandomEntry();
});

And('I navigate to reorder list screen', () => {
    germplasmListPage.openGermplasmListAction("reorderEntriesButton");
});

And('I specify a position', () => {
    germplasmListReorder.specifyPosition();
});

Then('a success message about reordering of entries should display', () => {
    germplasmListReorder.verifySuccessReorderEntries();
});

And('the selected germplasm should be on the specified position', () => {
    germplasmListReorder.verifyPositionChanged();
});
