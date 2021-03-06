import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page'
import ImportGermplasmUpdatePage from '../../../pageobjects/germplasm/import-germplasm-update-page'

const manageGermplasmPage = new ManageGermplasmPage()
const importGermplasmUpdatesPage = new ImportGermplasmUpdatePage()
const templateFileName = `GermplasmUpdateTemplate_${Cypress.env('cropName')}.xls`;

When('I select Import germplasm updates from Actions',()=>{
    manageGermplasmPage.openImportGermplasmUpdatesModal()
})

And('I download an import germplasm updates template', () => {
    importGermplasmUpdatesPage.downloadImportFile();
    cy.verifyDownload(templateFileName);
});
And('I import the germplasm update template file with complete details', () => {
    importGermplasmUpdatesPage.interceptSaveRequest();
    importGermplasmUpdatesPage.uploadGermplasmUpdateFile(templateFileName);
});

Then('saving of germplasm updates succeeds',()=>{
    importGermplasmUpdatesPage.verifySuccessfulImport();
})
