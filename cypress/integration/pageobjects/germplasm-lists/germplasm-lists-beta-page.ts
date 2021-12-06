import { getIframeBody } from '../../../support/commands';
import * as path from 'path';

export default class GermplasmListsBetaPage {

    openImportGermplasmListModal() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="actionMenu"]', { timeout: Cypress.config('pageLoadTimeout') }).should('exist').click();
            cy.wrap($iframe).find('[data-test="importListButton"]').should('exist').click();
        });
    }

    openGermplasmList() {
        getIframeBody().then(($iframe) => {
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

    verifyImportTemplateDownload(fileName: string) {
        const downloadsFolder = Cypress.config('downloadsFolder');
        // TODO clear downloads https://github.com/cypress-io/cypress/issues/14886
        cy.readFile(path.join(downloadsFolder, fileName)).should('exist');
    }

    verifyImportCancelled() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('.modal').should('not.exist');
        });
    }

    verifyErrorMessage(message: string) {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('ngb-alert > span').contains(message);
        });
    }
}
