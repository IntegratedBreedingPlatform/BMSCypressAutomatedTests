import { randomString } from '../../../support/commands';

export default class UsersPage{

    protected cropName = Cypress.env('cropName');
    protected programName = Cypress.env('existingProgramName');

    openAddUserModal() {
        getMainIframeDocumentWaitToLoad().find('table').should('be.visible');
        getMainIframeDocument().find('div.om-panel-content button').should('exist').contains('Add user').click();
    }

    createUser() {
        getMainIframeDocument().find('h4.modal-title').contains('Add User').should('exist');
        getMainIframeDocument().find('#firstName')
            .type("TestUser");
        getMainIframeDocument().find('#lastName')
            .type(id);
        getMainIframeDocument().find('#username')
            .type("user_" + id);
        getMainIframeDocument().find('#email')
            .type("user_" + id + "@sample.com");
        getMainIframeDocument().find('#userCrops span.select2-container')
            .type(this.cropName);
        getMainIframeDocument().find('span.select2-results li.select2-results__option')
            .contains(this.cropName).should('exist').click().then(() => {
            getMainIframeDocument().find('span.select2-selection li.select2-selection__choice')
                .invoke('attr', 'title').should('eq', this.cropName) ;
        });
    }

    assignRoleToUser() {
        getMainIframeDocument().find('div.form-group a').contains('+ Assign role').should('exist').click();
        getMainIframeDocument().find('#roleTypeCombo')
            .select("Program");
        getMainIframeDocument().find('#roleNameCombo')
            .select("Breeder");
        getMainIframeDocument().find('#cropCombo')
            .select(this.cropName);
        getMainIframeDocument().find('#programCombo')
            .select(this.programName);
        getMainIframeDocument().find('div.modal-footer > button').contains('Assign role').should('be.visible').click();
    }

    saveNewUser() {
        cy.intercept('POST', `/bmsapi/users*`).as('addUser');
        getMainIframeDocument().find('div.modal-footer > button').contains('Add user').should('be.visible').click();
    }

    checkAddUserSuccess() {
        cy.intercept('GET', `/bmsapi/users*`).as('searchUsers');
        cy.wait('@addUser').then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 201]);
            getMainIframeDocument().find('#default-notification h1').contains('Success').should('be.visible');
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

const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}

const getMainIframeDocumentWaitToLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}

const id = randomString(5);
