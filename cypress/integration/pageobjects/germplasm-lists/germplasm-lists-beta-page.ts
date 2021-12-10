import { getIframeBody } from '../../../support/commands';
import * as path from 'path';

export default class GermplasmListsBetaPage {

    openImportGermplasmListModal() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="actionMenu"]', { timeout: Cypress.config('pageLoadTimeout') }).should('exist').click();
            cy.wrap($iframe).find('[data-test="importListButton"]').should('exist').click();
        });
    }

    openGermplasmList(){
        cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListSearchTable"] > tbody > tr:nth-child(1) > td:nth-child(1) > a')
                .should('exist')
                .click()
                .then(($a) => {
                    const listName = $a.text();

                    cy.wrap($iframe).find('jhi-germplasm-list > section > div > section > nav > ul > li:nth-child(2) > a')
                        .should('exist')
                        .contains(listName);
                });
        });
    }

    verifyImportTemplateDownload() {
        const downloadsFolder = Cypress.config("downloadsFolder");
        // TODO clear downloads https://github.com/cypress-io/cypress/issues/14886
        cy.readFile(path.join(downloadsFolder, "GermplasmListImportTemplate.xls")).should("exist");
    }

    verifyImportCancelled() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('.modal').should('not.exist');
        });
    }
}
