import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
import { randomString } from "../../../../../cypress/support/commands";
import { loginAndNavigateToPage } from "../../../../../cypress/integration/common/navigation";
import GermplasmListAddToListPage from "../../../pageobjects/germplasm-lists/germplasm-list-add-to-list-page";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page';

const manageGermplasmPage = new ManageGermplasmPage();
const germplasmListAddToListPage = new GermplasmListAddToListPage();

const existingListName = 'TestListName' + randomString();
let existingListId: any;


before(() => {
    // Before all the scenarios are executed, login first and navigate to Germplasm Manager
    loginAndNavigateToPage('Germplasm Manager');
    // Create new germplasm list first
    manageGermplasmPage.selectAllCurrentPage();
    manageGermplasmPage.clickCreateNewListAction();
    manageGermplasmPage.clickSaveList(existingListName).then((listId) => {
        existingListId = listId;
    });
});

When('I filter some germplasm entries by GID', () => {
    manageGermplasmPage.filterByGid('1');
});

When('I filtered germplasm entries by the existing germplasm list', () => {
    manageGermplasmPage.filterByListName(existingListName);
});

When('I select some germplasm entries', () => {
    manageGermplasmPage.selectRandomGermplasm();
});

When('I select all germplasm entries on the current page', () => {
    manageGermplasmPage.selectAllCurrentPage();
});

And('I select all germplasm entries on the current page', () => {
    manageGermplasmPage.selectAllCurrentPage();
});

And('I add select germplasm entries to an existing list', () => {
    manageGermplasmPage.clickAddToExistingListAction();
    manageGermplasmPage.verifyAddToEntriesListModalIsDisplayed();
    germplasmListAddToListPage.selectExistingList(existingListName);
});

And('I confirm to add selected germplasm to the list', () => {
    germplasmListAddToListPage.clickAddToListConfirm(`**/germplasm-lists/*/entries?*`);
});

Then('a message saying germplasm entries added to list successfully should display', () => {
    germplasmListAddToListPage.verifySuccessAddToList();
});

And('I cancel adding selected germplasm entries to the list', () => {
    germplasmListAddToListPage.clickAddToListCancel();
});

Then('I should see the list tree', () => {
    germplasmListAddToListPage.verifyGermplasmAddToListModalBodyIsVisible();
});

When('I select germplasm entries from different pages', () => {
    manageGermplasmPage.selectAllCurrentPage();
    manageGermplasmPage.goToPage(2);
    manageGermplasmPage.selectAllCurrentPage();
});

And('I add select germplasm entries to an existing locked crop list', () => {
    manageGermplasmPage.clickAddToExistingListAction();
    manageGermplasmPage.verifyAddToEntriesListModalIsDisplayed();
    manageGermplasmPage.markListAsLocked(existingListId);
    germplasmListAddToListPage.selectExistingList(existingListName);
});

Then('an error message saying that list is locked should display', () => {
    manageGermplasmPage.verifyAlertMessage('List is locked');
});




