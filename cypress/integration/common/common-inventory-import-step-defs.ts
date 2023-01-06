import { getIframeBody, randomString } from '../../support/commands'

import CreateLotsPage from '../pageobjects/inventory/create-lots-page';
import { And } from 'cypress-cucumber-preprocessor/steps';
import ManageInventoryPage from '../pageobjects/inventory/manage-inventory-page';

const manageInventoryPage = new ManageInventoryPage();
const createLotsPage = new CreateLotsPage();

And('I have created a new lot', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.clickCreateInventoryLotsAction();
    });

    createLotsPage.specifyGID(Cypress.env('importedGid'));
    createLotsPage.specifyLotDetails("STK", "SEED_AMOUNT_g", "Sample Lot Notes " + randomString());
    createLotsPage.interceptSaveRequestFromManageInventory();
    createLotsPage.clickSaveButton();
    createLotsPage.verifySuccessfulCreationFromManageInventory();
});
