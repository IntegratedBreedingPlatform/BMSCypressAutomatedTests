import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page'
import AssignCodePage from '../../../pageobjects/germplasm/assign-code-germplasm-page';
import ImportGermplasmPage from '../../../pageobjects/germplasm/import-germplasm-page';

const manageGermplasmPage = new ManageGermplasmPage();
const assignCodePage = new AssignCodePage();
const importGermplasmPage = new ImportGermplasmPage();

When('I assign CODE 1 to a germplasm using automatic naming generation',()=>{
    assignCodePage.openAssignCodeModal();
    assignCodePage.selectCodeLevel("CODE1");
    assignCodePage.selectAutomaticNaming();
    assignCodePage.clickAssignCode();
})
When('I assign CODE 2 manually to a germplasm by specifying code',()=>{
    assignCodePage.openAssignCodeModal();
    assignCodePage.selectCodeLevel("CODE2");
    assignCodePage.selectManualNaming();
    assignCodePage.specifyManualNamingDetails("MANUAL","3","ABC", true, true, "5")
    assignCodePage.clickAssignCode();
})
Then('I should see that the selected entries have new generated names',()=>{
    assignCodePage.verifyCodingResults();
})
