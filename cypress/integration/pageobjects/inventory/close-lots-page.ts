import { getIframeBody } from '../../../support/commands';

export default class CloseLotsPage{
    selectNewLot() {
        getIframeBody().find('[data-test="sortByCreatedDateButton"]').should('exist').click();
        getIframeBody().find('[data-test="sortByCreatedDateButton"]').should('exist').click().then(() => {
            getIframeBody().find('[data-test="lotCheckbox"]').first().click();
        });
    }

    closeLots() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="closeLotsButton"]').should('exist').click();

        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/lots/close*`).as('closeLots');
        getIframeBody().find('[data-test="modalConfirmButton"]').should('exist').click();
    }

    verifyLotsClosedSuccessfully() {
        cy.wait('@closeLots').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('Lots closed!');
        })
    }
}
