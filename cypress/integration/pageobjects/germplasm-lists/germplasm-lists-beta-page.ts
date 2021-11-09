import { getIframeBody } from '../../../support/commands';
import * as path from 'path';

export default class GermplasmListsBetaPage {

    openImportGermplasmListModal() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="actionMenu"]', { timeout: Cypress.config('pageLoadTimeout') }).should('exist').click();
            cy.wrap($iframe).find('[data-test="importListButton"]').should('exist').click();
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
