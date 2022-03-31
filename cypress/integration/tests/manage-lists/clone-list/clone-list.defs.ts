import { And, Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';
import GermplasmListPage from '../../../pageobjects/germplasm-lists/germplasm-lists-page';
import AddEntryDetailsContext from '../add-entry-details/add-entry-details.context';
import GermplasmListAddEntryDetailsPage from '../../../pageobjects/germplasm-lists/germplasm-list-add-entry-details-page';
import GermplasmListCloneListPage from '../../../pageobjects/germplasm-lists/germplasm-list-clone-list-page';

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListAddEntryDetailsPage = new GermplasmListAddEntryDetailsPage(addEntryDetailsContext);
const searchPage = new GermplasmListsBetaPage();
const importModal = new GermplasmListImportPage();
const germplasmListCloneListPage = new GermplasmListCloneListPage();
let listName;
let clonedListName:string;

And('I import a new list', () => {
    listName = 'list name ' + randomString();
    searchPage.openImportGermplasmListModal();
    importModal.importNewList(listName);
    searchPage.selectListFilteredByListName(listName);
});

And('I add entry details variable to the list', () => {
    germplasmListPage.openAddEntryDetailsModal();
    germplasmListAddEntryDetailsPage.selectVariable();
    germplasmListPage.checkEntryDetailWasAdded();
    germplasmListPage.checkGermplasmListTableHasColumn();
});

And('I add value to the entry detail', () => {
    germplasmListPage.enterEntryDetailValue();
    germplasmListPage.checkEntryDetailValue();
});

When('I clone the list', () => {
    germplasmListPage.cloneList();
});

And('I save the list with a new name', () => {
    clonedListName = 'list name ' + randomString();
    importModal.clickSaveList(clonedListName);
});

Then('a message saying that germplasm list is cloned successfully should display', () => {
    germplasmListCloneListPage.verifySuccessMessage();
});

And('the cloned list is opened in another tab', () => {
    germplasmListCloneListPage.verifyClonedListIsOpened(clonedListName);
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
    importModal.clickSaveList(clonedListName);
});

Then('a message saying that there is an existing item with the same name displays', () => {
    germplasmListCloneListPage.verifyDuplicateNameErrorMessage();
});

When('I lock the imported list', () => {
    germplasmListPage.lockList();
});

And('I clone the list', () => {
    germplasmListPage.cloneList();
});
