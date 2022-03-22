import { When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import ManageGermplasmPage from '../pageobjects/germplasm/manage-germplasm-page'
import ImportGermplasmPage from '../pageobjects/germplasm/import-germplasm-page'
import GermplasmListImportPage from '../pageobjects/germplasm-lists/germplasm-list-import-page'
import LoginPage from '../pageobjects/account-management/login-page'
import DashboardPage from '../pageobjects/dashboard-page'
import SidebarSection, { SidebarTool } from '../pageobjects/sidebar-section'
import { randomString } from '../../support/commands';

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const sidebarSection = new SidebarSection()

const manageGermplasmPage = new ManageGermplasmPage()
const importGermplasmPage = new ImportGermplasmPage()
const importListPage = new GermplasmListImportPage()
var listName: string;
listName = 'list name ' + randomString();
When('germplasm records already exists', () => {
    // Reuse created RCBD study within session
       if (Cypress.env('germplasmList')) {
        return;
    // Otherwise, import germplasm
    } else {
        //Login
        dashboardPage.loginAndLaunchProgram();
        let tool = SidebarTool.getFromLinkName("Manage Germplasm");
        sidebarSection.navigate(tool);
        manageGermplasmPage.openImportGermplasmModal();
        importGermplasmPage.uploadFile('GermplasmImport_CleanInstall.xls');
        importGermplasmPage.goToInventoryScreen();
        importGermplasmPage.goToReviewScreen();
        importGermplasmPage.saveImport();
        importGermplasmPage.clickSaveList(listName);
        Cypress.env('germplasmList', listName);
    }
});