import { When } from 'cypress-cucumber-preprocessor/steps';
import ManageGermplasmPage from '../pageobjects/germplasm/manage-germplasm-page'
import ImportGermplasmPage from '../pageobjects/germplasm/import-germplasm-page'
import DashboardPage from '../pageobjects/dashboard-page'
import SidebarSection, { SidebarTool } from '../pageobjects/sidebar-section'
import { randomString, getIframeBody } from '../../support/commands';

const dashboardPage = new DashboardPage()
const sidebarSection = new SidebarSection()

const manageGermplasmPage = new ManageGermplasmPage()
const importGermplasmPage = new ImportGermplasmPage()
var listName: string;
listName = 'list name ' + randomString();
When('germplasm records already exists', () => {
    // Reuse imported list within session
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
        // Save to Cypress environment the first GID from import
        getIframeBody().find('#cdk-drop-list-1 > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)').then(($a) => {
            Cypress.env('importedGid', $a.text());
        })
    }
});