import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
import { randomString } from "../../../../../cypress/support/commands";
import { loginAndNavigateToPage } from "../../../../../cypress/integration/common/navigation";
import GermplasmListAddToListPage from "../../../pageobjects/germplasm-lists/germplasm-list-add-to-list-page";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page';
import GermplasmListsBetaPage from "../../../pageobjects/germplasm-lists/germplasm-lists-beta-page";
import GermplasmListPage from "../../../pageobjects/germplasm-lists/germplasm-lists-page";
import AddEntryDetailsContext from "../../manage-lists/add-entry-details/add-entry-details.context";
import GermplasmListDeleteListPage from "../../../pageobjects/germplasm-lists/germplasm-list-delete-list-page";
import SidebarSection from "../../../pageobjects/sidebar-section";

const manageGermplasmPage = new ManageGermplasmPage();
const germplasmListAddToListPage = new GermplasmListAddToListPage();
const germplasmListsBetaPage = new GermplasmListsBetaPage();
const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListDeleteListPage = new GermplasmListDeleteListPage();
const sidebarSection = new SidebarSection();

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

after(() => {
    // Delete the created germplasm list after all scenarios are executed.
    sidebarSection.navigateTo('Germplasm Lists');
    germplasmListsBetaPage.selectListFilteredByListName(existingListName);
    germplasmListPage.deleteList();
    germplasmListDeleteListPage.clickDeleteListConfirm();
    
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
    // Programatically lock the list
    manageGermplasmPage.toggleListStatus(existingListId);
    germplasmListAddToListPage.selectExistingList(existingListName);
});

Then('an error message saying that list is locked should display', () => {
    manageGermplasmPage.verifyAlertMessage('List is locked');
    // Programatically unlock the list
    manageGermplasmPage.toggleListStatus(existingListId);
});




