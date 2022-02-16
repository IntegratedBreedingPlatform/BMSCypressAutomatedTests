import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from '../../../pageobjects/germplasm-lists/germplasm-lists-page';
import GermplasmListAddEntryDetailsPage
    from '../../../pageobjects/germplasm-lists/germplasm-list-add-entry-details-page';
import AddEntryDetailsContext from './add-entry-details.context';
import { randomString } from '../../../../support/commands';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';

const addEntryDetailsContext = new AddEntryDetailsContext();
const searchPage = new GermplasmListsBetaPage();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListAddEntryDetailsPage = new GermplasmListAddEntryDetailsPage(addEntryDetailsContext);
let importModal = new GermplasmListImportPage();
var listName: string;

And('I import a list', () => {
    listName = 'list name ' + randomString();

    searchPage.openImportGermplasmListModal();
    importModal.importNewList(listName);
    searchPage.selectListFilteredByListName(listName);
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
