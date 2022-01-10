import { getIframeBody } from '../../../support/commands';

export default class GermplasmListRemoveEntriesPage {

    clickRemoveEntriesConfirm() {
        getIframeBody().then(($iframe) => {
            cy.intercept('DELETE', `**/entries?*`).as('removeEntries');
            cy.wrap($iframe).find('[data-test="modalConfirmButton"]').should('exist').click();
        });
    }

    verifySuccessRemoveEntries () {
        cy.wait('@removeEntries').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('Successfully removed entries.');
        })
    }

    clickRemoveEntriesCancel() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('button[data-dismiss="modal"]').contains("Cancel").should('exist').click();
        });
    }

    verifyModalClosed () {
        getIframeBody().find('ngb-modal-window').should('not.exist');
    }
}

const getModalContent = () => {
    return getIframeBody().find('jhi-germplasm-list-add > div > iframe', {timeout: Cypress.config('pageLoadTimeout')})
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap);
};
