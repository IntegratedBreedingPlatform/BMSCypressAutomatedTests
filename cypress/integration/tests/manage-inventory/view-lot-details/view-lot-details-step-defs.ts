import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';
import ViewLotsPage from '../../../pageobjects/inventory/view-lots-page';

const manageInventoryPage = new ManageInventoryPage();
const viewLotsPage = new ViewLotsPage();

When('I filter lot records by a germplasm list', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.filterByGermplasmList(Cypress.env('germplasmListWithInventory'));
        manageInventoryPage.verifySuccessfulLotsFilter(true);
    });
});

And('I click on stock ID of a lot', () => {
    viewLotsPage.clickLotStockId();
});

Then('I should be able to see the details of the lot', () => {
    viewLotsPage.verifyLotDetailsDisplayed();
});
