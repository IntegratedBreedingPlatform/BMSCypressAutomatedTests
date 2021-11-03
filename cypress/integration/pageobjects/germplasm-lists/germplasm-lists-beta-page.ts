import { getIframeBody } from '../../../support/commands';

export default class GermplasmListsBetaPage {

    openImportGermplasmListModal() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="actionMenu"]', { timeout: Cypress.config('pageLoadTimeout') }).should('exist').click();
            cy.wrap($iframe).find('[data-test="importListButton"]').should('exist').click();
        })
    }

    verifyImportTemplateDowload() {
        // TODO
    }
}
