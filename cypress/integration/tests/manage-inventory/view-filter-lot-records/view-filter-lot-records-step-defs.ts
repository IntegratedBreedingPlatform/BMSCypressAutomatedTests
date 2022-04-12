import { Then, When } from "cypress-cucumber-preprocessor/steps";
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';

const manageInventoryPage = new ManageInventoryPage();

When('I filter lot records by GID and location', () => {
    manageInventoryPage.waitForSearchResultsToLoad().then(() => {
        manageInventoryPage.filterLotsByGID(Cypress.env('importedGidWithInventory'));
        manageInventoryPage.filterLotsByLocation("Default Seed Store")
    });
});

Then('I should be able to see that the lot records were filtered successfully', () => {
    manageInventoryPage.verifySuccessfulLotsFilter(true);
});
