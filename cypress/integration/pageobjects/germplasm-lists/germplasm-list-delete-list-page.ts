import { getIframeBody } from '../../../support/commands';

export default class GermplasmListDeleteListPage {
    clickDeleteListConfirm() {
        getIframeBody().then(($iframe) => {
            cy.intercept('DELETE', `**/germplasm-lists/*`).as('deleteList');
            cy.wrap($iframe).find('[data-test="modalConfirmButton"]').should('exist').click();
        });
    }

    clickDeleteListCancel() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('button[data-dismiss="modal"]').contains("Cancel").should('exist').click();
        });
    }

    verifySuccessDeleteList () {
        cy.wait('@deleteList').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('Successfully deleted list.');
        })
    }

    verifyModalClosed () {
        getIframeBody().find('ngb-modal-window').should('not.exist');
    }

    verifyListIsLocked () {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListActionButton"]',{ timeout: Cypress.config('pageLoadTimeout') })
                .should('exist')
                .click();
            cy.wrap($iframe).find(`[data-test="deleteListButton"]`).should('not.exist');
        });
    }
}
