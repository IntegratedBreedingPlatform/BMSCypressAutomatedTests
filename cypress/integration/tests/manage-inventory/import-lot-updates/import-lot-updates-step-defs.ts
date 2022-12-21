import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';
import ImportLotUpdatePage from '../../../pageobjects/inventory/import-lot-update-page';
import { randomString } from '../../../../support/commands';
import CreateLotsPage from '../../../pageobjects/inventory/create-lots-page';

const manageInventoryPage = new ManageInventoryPage();
const importLotUpdatePage = new ImportLotUpdatePage();
const templateFileName = `basic_template_import_update_lots_${Cypress.env('cropName')}.xls`;

const createLotsPage = new CreateLotsPage();

var createdLot;

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

When('I navigate to import lot update screen', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.clickImportLotUpdateAction();
    });
});

And('I download an import lot update template file', () => {
    importLotUpdatePage.downloadImportFile();
    cy.verifyDownload(templateFileName);
});

And('I import the lot update template file with complete and valid details', () => {
    cy.get('@newLotUID').then((newLotUID:any) => {
        importLotUpdatePage.interceptSaveRequest();
        importLotUpdatePage.uploadFile(templateFileName, newLotUID);
    });
});

Then('I should be able to see that the lot has been updated successfully', () => {
    importLotUpdatePage.verifySuccessfulImport();
});
