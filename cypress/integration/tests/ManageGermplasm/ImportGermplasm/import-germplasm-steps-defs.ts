import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page'
import ImportGermplasmPage from '../../../pageobjects/germplasm/import-germplasm-page'

const manageGermplasmPage = new ManageGermplasmPage()
const importGermplasmPage = new ImportGermplasmPage()

When('I select Import germplasm from Actions',()=>{
    manageGermplasmPage.openImportGermplasmModal()
})

And('I select a file to upload',()=>{
    importGermplasmPage.uploadFile()
})

And('I click Next on Import Germplasm screen',()=>{
    importGermplasmPage.goToInventoryScreen();
})

And('I click Next on Create Inventory screen',()=>{
    importGermplasmPage.goToReviewScreen();
})

And('I click Save on Review Germplasm screen',()=>{
    importGermplasmPage.saveImport();
})

Then('saving of germplasm succeeds',()=>{
    importGermplasmPage.verifyImportSaved();
})




