import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page'
import GroupGermplasmPage from '../../../pageobjects/germplasm/group-germplasm-page';
import ImportGermplasmPage from '../../../pageobjects/germplasm/import-germplasm-page';

const manageGermplasmPage = new ManageGermplasmPage();
const groupGermplasmPage = new GroupGermplasmPage();
const importGermplasmPage = new ImportGermplasmPage();

And('I select grouped germplasm entries from the list',()=>{
    manageGermplasmPage.openImportGermplasmModal();
    importGermplasmPage.uploadFile('GermplasmImportDerivative.xls');
    importGermplasmPage.goToInventoryScreen();
    importGermplasmPage.goToReviewScreen();
    importGermplasmPage.saveImport();
    importGermplasmPage.skipSavingList();
})
