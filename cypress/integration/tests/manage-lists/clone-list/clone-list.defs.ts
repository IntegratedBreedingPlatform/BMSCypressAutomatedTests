import { When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import GermplasmListCloneListPage from '../../../pageobjects/germplasm-lists/germplasm-list-clone-list-page';
import AddEntryDetailsContext from '../add-entry-details/add-entry-details.context';
import GermplasmListPage from '../../../pageobjects/germplasm-lists/germplasm-lists-page';
import { randomString } from '../../../../support/commands';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListAddEntryDetailsPage from '../../../pageobjects/germplasm-lists/germplasm-list-add-entry-details-page';

var listCloneName: string;

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListImportPage = new GermplasmListImportPage();
const germplasmListCloneListPage = new GermplasmListCloneListPage();
const searchPage = new GermplasmListsBetaPage();
const germplasmListAddEntryDetailsPage = new GermplasmListAddEntryDetailsPage(addEntryDetailsContext);



And('I open an existing list', () => {
    searchPage.openGermplasmList();
});
And('I add entry details variable to the list', () => {
    germplasmListPage.openAddEntryDetailsModal();
    germplasmListAddEntryDetailsPage.selectVariable();
    germplasmListPage.checkEntryDetailWasAdded();
    germplasmListPage.checkGermplasmListTableHasColumn();
});

When('I clone the list', () => {
    germplasmListPage.cloneList();
});

And('I save the list with a new name', () => {
    listCloneName = 'list name ' + randomString();
    germplasmListImportPage.clickSaveList(listCloneName);
});

And('I add value to the entry detail', () => {
    germplasmListPage.enterEntryDetailValue();
});

Then('a message saying that germplasm list is cloned successfully should display', () => {
    germplasmListCloneListPage.verifySuccessMessage();
});

And('the cloned list is opened in another tab', () => {
    germplasmListCloneListPage.verifyClonedListIsOpened(listCloneName);
});

And('the entry detail variables are available in the list', () => {
    germplasmListPage.checkEntryDetailWasAdded();
    germplasmListPage.checkGermplasmListTableHasColumn();
});

And('the entry detail values are available in the list', () => {
    germplasmListPage.checkEntryDetailValue();
});

And('I save the list with an existing name', () => {
    cy.intercept('POST', `**/clone?*`).as('cloneList');
    germplasmListImportPage.clickSaveList(listCloneName);
});

Then('a message saying that there is an existing item with the same name displays', () => {
    germplasmListCloneListPage.verifyDuplicateNameErrorMessage();
});

