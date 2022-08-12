import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from "../../../../../cypress/support/commands";
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';
import CreateLotsPage from '../../../pageobjects/inventory/create-lots-page';
import CloseLotsPage from '../../../pageobjects/inventory/close-lots-page';

const manageInventoryPage = new ManageInventoryPage();
const createLotsPage = new CreateLotsPage();
const closeLotsPage = new CloseLotsPage();

Given('I have created a new lot', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.clickCreateInventoryLotsAction();
    });

    createLotsPage.specifyGID(Cypress.env('importedGid'));
    createLotsPage.specifyLotDetails("STK", "SEED_AMOUNT_g", "Sample Lot Notes " + randomString());
    createLotsPage.interceptSaveRequestFromManageInventory();
    createLotsPage.clickSaveButton();
    createLotsPage.verifySuccessfulCreationFromManageInventory();
});

When('I select the created lot', () => {
    closeLotsPage.selectNewLot();
});

And('I close the lot', () => {
    closeLotsPage.closeLots();
});

Then('I should see that the lot is closed successfully', () => {
    closeLotsPage.verifyLotsClosedSuccessfully();
});
