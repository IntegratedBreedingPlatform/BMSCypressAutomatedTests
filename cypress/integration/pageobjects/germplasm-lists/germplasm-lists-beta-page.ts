import { getIframeBody } from '../../../support/commands';

export default class GermplasmListsBetaPage {

    openImportGermplasmListModal() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="actionMenu"]', { timeout: 15000 }).should('exist').click();
            cy.wrap($iframe).find('[data-test="importListButton"]').should('exist').click();

        })
    }

}
