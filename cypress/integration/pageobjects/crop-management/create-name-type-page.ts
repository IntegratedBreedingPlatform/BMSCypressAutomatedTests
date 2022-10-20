import { getIframeBody, randomString } from '../../../support/commands';

export default class CreateNameTypePage{
    clickNameTypeTab() {
        getIframeBody().find('[data-test="nameTypesSettingsTab"]').should('exist').click();
    }

    openCreateNameTypeModal() {
        getIframeBody().find('[data-test="newNameTypeButton"]').should('exist').click();
        getIframeBody().find('[data-test="editNameTypeDialog"]').should('be.visible');
    }

    enterNameTypeDetails() {
        getIframeBody().find('#code').type(randomString());
        getIframeBody().find('#name').type(randomString());
        getIframeBody().find('#description').type(randomString());
        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/name-types*`).as('createNameType');
        getIframeBody().find('[data-test="createNameTypeButton"]').should('exist').click();
    }

    verifyCreateNameTypeSuccessfully() {
        cy.wait('@createNameType').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('Name type created successfully');
        })
    }
}
