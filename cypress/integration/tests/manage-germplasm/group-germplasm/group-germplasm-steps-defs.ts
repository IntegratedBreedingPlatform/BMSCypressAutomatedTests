import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page'
import GroupGermplasmPage from '../../../pageobjects/germplasm/group-germplasm-page';
import ImportGermplasmPage from '../../../pageobjects/germplasm/import-germplasm-page';

const manageGermplasmPage = new ManageGermplasmPage();
const groupGermplasmPage = new GroupGermplasmPage();
const importGermplasmPage = new ImportGermplasmPage();

And('I imported a germplasm list with derivative germplasm entries',()=>{
    manageGermplasmPage.openImportGermplasmModal();
    importGermplasmPage.uploadFile('GermplasmImportDerivative.xls');
    importGermplasmPage.goToImportBasicDetailsScreen();
    importGermplasmPage.goToInventoryScreen();
    importGermplasmPage.goToReviewScreen();
    importGermplasmPage.saveImport();
    importGermplasmPage.skipSavingList();
})

And('I select all germplasm entries from the list',()=>{
    groupGermplasmPage.selectAllImportedEntries();
})

When('I mark the germplasm entries as fixed to assign them in a group',()=>{
    manageGermplasmPage.openGroupGermplasmModal();
    groupGermplasmPage.confirmGermplasmGrouping();
})

Then('I should see that the selected entries have assigned group id',()=>{
    groupGermplasmPage.verifySuccessMessage();
    groupGermplasmPage.verifyGroupIdExists();
})

