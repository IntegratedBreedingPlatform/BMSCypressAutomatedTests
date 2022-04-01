import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
import { randomString } from "../../../../../cypress/support/commands";
import GermplasmListAddToListPage from "../../../pageobjects/germplasm-lists/germplasm-list-add-to-list-page";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page';
import CreateNewListPage from '../../../pageobjects/germplasm/create-new-list-page';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from '../../../pageobjects/germplasm-lists/germplasm-lists-page';
import GermplasmListDeleteListPage from '../../../pageobjects/germplasm-lists/germplasm-list-delete-list-page';
import AddEntryDetailsContext from '../../manage-lists/add-entry-details/add-entry-details.context';

const manageGermplasmPage = new ManageGermplasmPage();
const germplasmListAddToListPage = new GermplasmListAddToListPage();
const createNewListPage = new CreateNewListPage();
const searchPage = new GermplasmListsBetaPage();

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListDeleteListPage = new GermplasmListDeleteListPage();

const newList = 'TestListName' + randomString();

When('I select some germplasm entries', () => {
    manageGermplasmPage.selectRandomGermplasm();
});

When('I select germplasm entries from different pages', () => {
    manageGermplasmPage.selectAllCurrentPage();
    manageGermplasmPage.goToPage(2);
    manageGermplasmPage.selectAllCurrentPage();
});

When('I select all germplasm entries on the current page', () => {
    manageGermplasmPage.selectAllCurrentPage();
});

When('I filter some germplasm entries by GID', () => {
    manageGermplasmPage.filterByGid('1');
});

And('I add selected germplasm entries to a new list', () => {
    manageGermplasmPage.clickCreateNewListAction();
});

And('I save the new list', () => {
    createNewListPage.interceptSaveRequest();
    manageGermplasmPage.clickSaveList(newList);
});

And('I cancel saving the the list', () => {
    createNewListPage.clickCancelSaveList();
});

And('And I save the new list in Crop Lists folder', () => {

});

Then('a message saying germplasm list successfully saved should display', () => {
    createNewListPage.verifySuccessAddToList();
});

And('the new list should include the selected germplasm list', () => {
    searchPage.filterAndVerifyResult(newList, 'not.exist');
    cy.wait(100);
    searchPage.selectFirstList();
    germplasmListPage.deleteList();
    germplasmListDeleteListPage.clickDeleteListConfirm();
});

Then('the list saving screen should close', () => {
    germplasmListDeleteListPage.verifyModalClosed();
});

And('the status of the saved crop list should be locked', () => {
    searchPage.filterAndVerifyResult(newList, 'not.exist');
    // Check if locked
    searchPage.selectFirstList();
    germplasmListPage.deleteList();
    germplasmListDeleteListPage.clickDeleteListConfirm();
});
