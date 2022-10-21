import { Then, When } from "cypress-cucumber-preprocessor/steps";
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';

const manageInventoryPage = new ManageInventoryPage();

When('I filter lot records by a germplasm list', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.filterByGermplasmList(Cypress.env('germplasmListWithInventory'));
    });
});

Then('I should be able to see that the lot records were filtered successfully', () => {
    manageInventoryPage.verifySuccessfulLotsFilter(true);
});
