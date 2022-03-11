import { getIframeBody } from '../../../support/commands';

export default class GermplasmListEditListMetadataPage {
    fillUpValidInfo() {
        getIframeBody().find('[data-test="name"]').type('{end}-update');
        getIframeBody().find('#description').type('{end}-update');
        getIframeBody().find('#dropdownTypes').select("CHECK");
        getIframeBody().find('#notes').type('{end}-update');
    }

    enterNewName(newName: string) {
        getIframeBody().find('[data-test="name"]').clear().type(newName);
    }

    enterInvalidName() {
        getIframeBody().find('[data-test="name"]').type('{end}- update to invalid name that exceeds 50 characters');
        cy.wait(1000);
    }

    enterInvalidDescription() {
        getIframeBody().find('#description').type('{end}- this is an updated description that exceeds 255 characters ' +
            'and must return an error that says "description must not exceed 255 characters"...........................................' +
            '........................................................................');
        cy.wait(1000);
    }

    clickModalSave() {
        getIframeBody().then(($iframe) => {
            cy.intercept('PATCH', `**/germplasm-lists/*`).as('editMetadata');
            cy.wrap($iframe).find('[data-test="saveList"]').should('exist').click();
        });
    }

    verifySuccessEditMetadata () {
        cy.wait('@editMetadata').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('List metadata saved successfully!');
        })
    }

    verifyError (errorMessage: string) {
        cy.wait('@editMetadata').then((interception) => {
            expect(interception.response.statusCode).to.equal(400);
            getIframeBody().find('ngb-alert > span').contains(errorMessage);
        })
    }
}

