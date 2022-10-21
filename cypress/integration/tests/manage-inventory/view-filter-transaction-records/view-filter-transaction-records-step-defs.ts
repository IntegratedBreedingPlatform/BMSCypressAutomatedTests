import { Then, When, And } from "cypress-cucumber-preprocessor/steps";
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';

const manageInventoryPage = new ManageInventoryPage();


When('I navigate to transaction records page', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.viewTransactionsTab();
    });
    manageInventoryPage.viewTransactionsTab();
});

And('I filter transaction records by GID', () => {
    manageInventoryPage.interceptTransactionsSearchResultsLoad();
    manageInventoryPage.filterByGID(Cypress.env('importedGidWithInventory'));
});

And('I filter transaction records by type', () => {
    manageInventoryPage.waitForTransactionsSearchResultsToLoad().then(() => {
        manageInventoryPage.filterTransactionsByType('Deposit');
    }); 
});

And('I filter transaction records by status', () => {
    manageInventoryPage.waitForTransactionsSearchResultsToLoad().then(() => {
        manageInventoryPage.filterTransactionsByStatus('Confirmed');
    }); 
});

Then('I should be able to see that the transaction records were filtered successfully', () => {
    manageInventoryPage.verifySuccessfulTransactionsFilter(true);
});
