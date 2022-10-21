import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
import { randomString } from "../../../../../cypress/support/commands";
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';
import CreateLotsPage from '../../../pageobjects/inventory/create-lots-page';

const manageInventoryPage = new ManageInventoryPage();
const createLotsPage = new CreateLotsPage();


When('I navigate to create lots screen', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.clickCreateInventoryLotsAction();
    });
   
});

And('I specified valid values for lot details', () => {
    createLotsPage.specifyGID(Cypress.env('importedGid'));
    createLotsPage.specifyLotDetails("STK", "SEED_AMOUNT_g", "Sample Lot Notes " + randomString());
});

And('I enable initial deposit', () => {
    createLotsPage.enableInitialDeposit();
});

And('I specify valid deposit details', () => {
    createLotsPage.specifyDepositDetails("100", "Sample Deposit Notes " + randomString());
});

And('I confirm transactions on saving', () => {
    createLotsPage.confirmTransactionsOnSaving();
});

And('I save the new lot', () => {
    createLotsPage.interceptSaveRequestFromManageInventory();
    createLotsPage.clickSaveButton();
});

Then('I should be able to see that the new lot has been created successfully', () => {
    createLotsPage.verifySuccessfulCreationFromManageInventory();
});
