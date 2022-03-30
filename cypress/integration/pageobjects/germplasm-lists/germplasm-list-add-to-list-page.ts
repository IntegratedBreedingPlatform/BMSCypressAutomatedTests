import { getIframeBody } from '../../../support/commands';

export default class GermplasmListAddToListPage {
    selectExistingList(listName: string) {
        getIframeBody().find('[data-test="addToListTable"]').should('be.visible');
        getIframeBody().find('[data-test="addToListTable"] > div > div > table > tbody > tr > td:nth-child(1)')
            .contains(listName)
            .should('exist')
            .click();
        getIframeBody().find('[data-test="addToListModalButton"]')
            .should('exist')
            .click();
    }

    clickAddToListConfirm(addToListApiURL: string) {
        getIframeBody().then(($iframe) => {
            cy.intercept('POST', addToListApiURL).as('addToList');
            cy.wrap($iframe).find('[data-test="modalConfirmButton"]').should('exist').click();
        });
    }

    clickAddToListCancel() {
        getIframeBody().find('[data-test="modalCancelButton"]').should('exist').click();
    }

    verifySuccessAddToList () {
        cy.wait('@addToList').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('Germplasm entries added to list successfully!');
        })
    }

    verifyListIsLocked () {
        cy.wait('@addToList').then((interception) => {
            expect(interception.response.statusCode).to.equal(400);
            getIframeBody().find('ngb-alert > span').contains('List is locked');
        })
    }

    verifyGermplasmAddToListModalBodyIsVisible() {
        getIframeBody().find('[data-test="addToListModalBody"]').should('be.visible');
    }
}

