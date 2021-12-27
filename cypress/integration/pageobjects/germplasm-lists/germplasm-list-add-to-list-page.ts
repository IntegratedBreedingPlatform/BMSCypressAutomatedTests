import { getIframeBody } from '../../../support/commands';

export default class GermplasmListAddToListPage {
    selectExistingList(listName: string) {
        getIframeBody().find('jhi-germplasm-list-add').should('be.visible');
        getIframeBody().find('div.ui-treetable-wrapper > table > tbody > tr > td:nth-child(1)')
            .contains(listName)
            .should('exist')
            .click();
        getIframeBody().find('span[jhitranslate="germplasm-list-add.add-action"]')
            .should('exist')
            .click();
    }

    clickAddToListConfirm() {
        getIframeBody().then(($iframe) => {
            cy.intercept('POST', `**/entries/import?*`).as('addToList');
            cy.wrap($iframe).find('[data-test="modalConfirmButton"]').should('exist').click();
        });
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
}

const getModalContent = () => {
    return getIframeBody().find('jhi-germplasm-list-add > div > iframe', {timeout: Cypress.config('pageLoadTimeout')})
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap);
};
