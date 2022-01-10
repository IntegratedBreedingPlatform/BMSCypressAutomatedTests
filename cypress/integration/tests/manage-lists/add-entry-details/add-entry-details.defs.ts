import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from '../../../pageobjects/germplasm-lists/germplasm-lists-page';
import GermplasmListAddEntryDetailsPage
    from '../../../pageobjects/germplasm-lists/germplasm-list-add-entry-details-page';
import AddEntryDetailsContext from './add-entry-details.context';

const addEntryDetailsContext = new AddEntryDetailsContext();
const searchPage = new GermplasmListsBetaPage();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListAddEntryDetailsPage = new GermplasmListAddEntryDetailsPage(addEntryDetailsContext);

And('I open an existing list', () => {
    searchPage.openGermplasmList();
});
When('I navigate to add entry details screen', () => {
    germplasmListPage.openAddEntryDetailsModal();
});
And('I add entry details variable to the list', () => {
    germplasmListAddEntryDetailsPage.selectVariable();
    germplasmListPage.checkEntryDetailWasAdded();
    germplasmListPage.checkGermplasmListTableHasColumn();
});
And('I add value to the entry detail', () => {
    germplasmListPage.enterEntryDetailValue();
});
Then('I should be able to see that the variable is added to the germplasm list', () => {
    germplasmListPage.checkEntryDetailValue();
});
