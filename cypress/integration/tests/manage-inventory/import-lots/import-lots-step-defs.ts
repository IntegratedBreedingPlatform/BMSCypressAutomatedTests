import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
import { randomString } from "../../../../../cypress/support/commands";
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';
import ImportLotsPage from '../../../pageobjects/inventory/import-lots-page';

const manageInventoryPage = new ManageInventoryPage();
const importLotsPage = new ImportLotsPage();
const templateFileName = `basic_template_import_lots_${Cypress.env('cropName')}.xls`;

When('I navigate to import lots screen', () => {
    manageInventoryPage.waitForSearchResultsToLoad().then(() => {
        manageInventoryPage.clickImportInventoryLotsAction();
    });
});

And('I download an import lot template file', () => {
    importLotsPage.downloadImportFile();
    cy.verifyDownload(templateFileName);
});

And('I import the lot template file with complete and valid details', () => {
    importLotsPage.interceptSaveRequest();
    importLotsPage.uploadFile(templateFileName);
});

Then('I should be able to see that the lot has been imported successfully', () => {
    importLotsPage.verifySuccessfulImport();
});
