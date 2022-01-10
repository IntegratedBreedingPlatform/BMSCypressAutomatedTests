import { randomString, getIframeBody } from '../../../support/commands';

export default class UsersPage{

    protected cropName = Cypress.env('cropName');
    protected programName = Cypress.env('existingProgramName');

    openAddUserModal() {
        getIframeBody().find('table', {timeout: 30000}).should('be.visible');
        getIframeBody().find('div.om-panel-content button').should('exist').contains('Add user').click();
    }

    createUser() {
        getIframeBody().find('h4.modal-title').contains('Add User').should('exist');
        getIframeBody().find('#firstName')
            .type("TestUser");
        getIframeBody().find('#lastName')
            .type(id);
        getIframeBody().find('#username')
            .type("user_" + id);
        getIframeBody().find('#email')
            .type("user_" + id + "@sample.com");
        getIframeBody().find('#userCrops span.select2-container')
            .type(this.cropName);
        getIframeBody().find('span.select2-results li.select2-results__option')
            .contains(this.cropName).should('exist').click().then(() => {
            getIframeBody().find('span.select2-selection li.select2-selection__choice')
                .invoke('attr', 'title').should('eq', this.cropName) ;
        });
    }

    assignRoleToUser() {
        getIframeBody().find('div.form-group a').contains('+ Assign role').should('exist').click();
        getIframeBody().find('#roleTypeCombo')
            .select("Program");
        getIframeBody().find('#roleNameCombo')
            .select("Breeder");
        getIframeBody().find('#cropCombo')
            .select(this.cropName);
        getIframeBody().find('#programCombo')
            .select(this.programName);
        getIframeBody().find('div.modal-footer > button').contains('Assign role').should('be.visible').click();
    }

    saveNewUser() {
        cy.intercept('POST', `/bmsapi/users*`).as('addUser');
        getIframeBody().find('div.modal-footer > button').contains('Add user').should('be.visible').click();
    }

    checkAddUserSuccess() {
        cy.intercept('GET', `/bmsapi/users*`).as('searchUsers');
        cy.wait('@addUser').then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 201]);
            getIframeBody().find('#default-notification h1').contains('Success').should('be.visible');
        });
    }

    checkNewUserExists() {
        cy.wait('@searchUsers').then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            const respBody = interception.response.body;
            var newUserExists = false;

            expect(respBody.length).to.be.greaterThan(0);
            for(var i=0; i < respBody.length; i++) {
                if(respBody[i]["lastName"] == id) {
                    newUserExists = true;
                }
            }
            expect(newUserExists).to.be.true;
        });
    }
}

const id = randomString(5);
