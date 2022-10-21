import { When } from 'cypress-cucumber-preprocessor/steps';
import ManageGermplasmPage from '../pageobjects/germplasm/manage-germplasm-page'
import ImportGermplasmPage from '../pageobjects/germplasm/import-germplasm-page'
import DashboardPage from '../pageobjects/dashboard-page'
import SidebarSection, { SidebarTool } from '../pageobjects/sidebar-section'
import { randomString, getIframeBody } from '../../support/commands';
import GroupGermplasmPage from '../pageobjects/germplasm/group-germplasm-page';

const dashboardPage = new DashboardPage()
const sidebarSection = new SidebarSection()

const manageGermplasmPage = new ManageGermplasmPage()
const importGermplasmPage = new ImportGermplasmPage()
const groupGermplasmPage = new GroupGermplasmPage();
var listName: string;
listName = 'list name ' + randomString();
const templateFileName = `GermplasmImportTemplate_${Cypress.env('cropName')}.xls`;


When('grouped germplasm records already exists', () => {
    // Reuse imported germplasm within session
       if (Cypress.env('importedGIDForGrouping')) {
        return;
    // Otherwise, import germplasm
    } else {
        //Login
        dashboardPage.loginAndLaunchProgram();
        let tool = SidebarTool.getFromLinkName("Manage Germplasm");
        sidebarSection.navigate(tool);
        manageGermplasmPage.openImportGermplasmModal();
        importGermplasmPage.downloadImportGermplasmTemplateFile();
        cy.verifyDownload(templateFileName);
        //Import new germplasm records
        importGermplasmPage.importGermplasmTemplateWithData(templateFileName, false);
        //Mark germplasm records as fixed
        groupGermplasmPage.selectAllImportedEntries();
        manageGermplasmPage.openGroupGermplasmModal();
        groupGermplasmPage.confirmGermplasmGrouping();
        getIframeBody().find('#cdk-drop-list-1 > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)').then(($a) => {
            Cypress.env('importedGIDForGrouping', $a.text());
        })
    }
});



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
        importGermplasmPage.importFile('GermplasmImport_CleanInstall.xls', listName, false);
        Cypress.env('germplasmList', listName);
        // Save to Cypress environment the first GID from import
        getIframeBody().find('#cdk-drop-list-1 > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)').then(($a) => {
            Cypress.env('importedGid', $a.text());
        })
    }
});

When('germplasm with lot records already exists', () => {
    // Reuse imported list within session
       if (Cypress.env('germplasmListWithInventory')) {
        return;
    // Otherwise, import germplasm
    } else {
        //Login
        dashboardPage.loginAndLaunchProgram();
        let tool = SidebarTool.getFromLinkName("Manage Germplasm");
        sidebarSection.navigate(tool);
        manageGermplasmPage.openImportGermplasmModal();
        importGermplasmPage.importFile('GermplasmImport_CleanInstall.xls', listName, true);
        Cypress.env('germplasmListWithInventory', listName);
        // Save to Cypress environment the first GID from import
        getIframeBody().find('#cdk-drop-list-1 > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)').then(($a) => {
            Cypress.env('importedGidWithInventory', $a.text());
        })
    }
});