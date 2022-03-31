import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
import { randomString } from "../../../../../cypress/support/commands";
import GermplasmListAddToListPage from "../../../pageobjects/germplasm-lists/germplasm-list-add-to-list-page";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page';
import CreateNewListPage from '../../../pageobjects/germplasm/create-new-list-page';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';

const manageGermplasmPage = new ManageGermplasmPage();
const germplasmListAddToListPage = new GermplasmListAddToListPage();
const createNewListPage = new CreateNewListPage();
const searchPage = new GermplasmListsBetaPage();

const newList = 'TestListName' + randomString();

When('I select some germplasm entries', () => {
    manageGermplasmPage.selectRandomGermplasm();
});

And('I add selected germplasm entries to a new list', () => {
    manageGermplasmPage.clickCreateNewListAction();
});

And('I save the new list', () => {
    createNewListPage.interceptSaveRequest();
    manageGermplasmPage.clickSaveList(newList);
});

Then('a message saying germplasm list successfully saved should display', () => {
    createNewListPage.verifySuccessAddToList();
});

And('the new list should include the selected germplasm list', () => {
    searchPage.filterAndVerifyResult(newList, 'not.exist');
});
