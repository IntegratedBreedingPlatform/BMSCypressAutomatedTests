import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";
import CreateLotsPage from "../../../pageobjects/inventory/create-lots-page";
import ManageInventoryPage from "../../../pageobjects/inventory/manage-inventory-page";
import DepositInventoryPage from "../../../pageobjects/inventory/deposit-inventory-page";
import WithdrawInventoryPage from "../../../pageobjects/inventory/withdraw-inventory-page";
import { randomString } from "../../../../../cypress/support/commands";


const manageInventoryPage = new ManageInventoryPage();
const createLotsPage = new CreateLotsPage();
const depositInventoryPage = new DepositInventoryPage();
const withdrawInventoryPage = new WithdrawInventoryPage();

Given('I have created a new lot', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.clickCreateInventoryLotsAction();
    });
    createLotsPage.specifyGID(Cypress.env('importedGid'));
    createLotsPage.specifyLotDetails("STK", "SEED_AMOUNT_g", "Sample Lot Notes " + randomString());
    createLotsPage.enableInitialDeposit();
    createLotsPage.specifyDepositDetails('200', 'Initial Deposit');
    createLotsPage.interceptSaveRequestFromManageInventory();
    createLotsPage.clickSaveButton();
    createLotsPage.verifySuccessfulCreationFromManageInventory();
});

And('I filter by Lot UID', () => {
    cy.get('@newLotUID').then((newLotUID:any) => {
        manageInventoryPage.filterByLotUID(newLotUID).then(() => {
            manageInventoryPage.selectCurrentPageForLotsTable();
        });
    });
});

And('I create Deposit Inventory', () => {
    manageInventoryPage.clickDepositInventoryAction();
    depositInventoryPage.setAmountForUnit('100', 'SEED_AMOUNT_g');
    depositInventoryPage.setNotes('Test Deposit Transaction');
    // Uncheck confirm transaction
    depositInventoryPage.toggleConfirmTransactionsCheckbox(false);
    depositInventoryPage.clickSave();
});

And('I create Withdrawal Inventory', () => {
    manageInventoryPage.selectCurrentPageForLotsTable();
    manageInventoryPage.clickWithdrawInventoryAction();
    withdrawInventoryPage.setAmountForUnit('50', 'SEED_AMOUNT_g');
    withdrawInventoryPage.setNotes('Test Withdraw Transaction');
    // Uncheck confirm transaction
    withdrawInventoryPage.toggleConfirmTransactionsCheckbox(false);
    withdrawInventoryPage.clickSave();
});

When('I navigate to View Transactions tab', () => {
    manageInventoryPage.viewTransactionsTab();
});

And('I filtered transactions by the germplasm list with existing pending transactions', () => {
    
});

And('I confirmed all filtered transactions', () => {
    
});

Then('I should see a success message that transactions were successfully confirmed', () => {
    
});
