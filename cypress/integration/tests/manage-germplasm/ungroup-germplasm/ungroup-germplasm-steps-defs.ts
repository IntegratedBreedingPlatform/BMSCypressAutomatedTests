import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page'
import GroupGermplasmPage from '../../../pageobjects/germplasm/group-germplasm-page';
import { randomString } from '../../../../support/commands';
import ImportGermplasmPage from '../../../pageobjects/germplasm/import-germplasm-page';

const manageGermplasmPage = new ManageGermplasmPage();
const groupGermplasmPage = new GroupGermplasmPage();
const importGermplasmPage = new ImportGermplasmPage();

var listName: string;

And('I imported a germplasm list with derivative germplasm entries',()=>{
    manageGermplasmPage.openImportGermplasmModal();
    importGermplasmPage.uploadFile('GermplasmImportDerivative2.xls');
    importGermplasmPage.goToImportBasicDetailsScreen();
    importGermplasmPage.goToInventoryScreen();
    importGermplasmPage.goToReviewScreen();
    importGermplasmPage.saveImport();
    importGermplasmPage.skipSavingList();
})

And('I select all germplasm entries from the list',()=>{
    groupGermplasmPage.selectAllImportedEntries();
})

And('I mark the germplasm entries as fixed to assign them in a group',()=>{
    manageGermplasmPage.openGroupGermplasmModal();
    groupGermplasmPage.confirmGermplasmGrouping();
})

Then('I should see that the selected entries have assigned group id',()=>{
    groupGermplasmPage.verifySuccessMessage();
    groupGermplasmPage.verifyGroupIdExists();
})

When('I ungroup the germplasm entries', () => {
    manageGermplasmPage.selectAllCurrentPage();
    manageGermplasmPage.clickUngroupActionAndConfirm();
});

Then('I should see that all germplasm entries are ungrouped', () => {
    manageGermplasmPage.verifySuccessUngroupAction();
});

