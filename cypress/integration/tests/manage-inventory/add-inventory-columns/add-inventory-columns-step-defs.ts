import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ManageInventoryPage from '../../../pageobjects/inventory/manage-inventory-page';
import ImportLotUpdatePage from '../../../pageobjects/inventory/import-lot-update-page';
import { randomString } from '../../../../support/commands';

const manageInventoryPage = new ManageInventoryPage();
const importLotUpdatePage = new ImportLotUpdatePage();
const templateFileName = `basic_template_import_update_lots_${Cypress.env('cropName')}.xls`;

And('I added attributes to the lot record', () => {
    manageInventoryPage.waitForLotsSearchResultsToLoad().then(() => {
        manageInventoryPage.clickImportLotUpdateAction();
    });
    importLotUpdatePage.downloadImportFile();
    cy.verifyDownload(templateFileName);
    cy.get('@newLotUID').then((newLotUID:any) => {
        importLotUpdatePage.interceptSaveRequest();
        importLotUpdatePage.uploadFile(templateFileName, newLotUID, 'generateImportLotAttributesData');
    });
});

And('I add additional columns including inventory attributes', () => {
    manageInventoryPage.selectColumnsToDisplay();
});

Then('I should be able to see the columns added to the lot table', () => {
    manageInventoryPage.verifyDisplayedColumns();
});
