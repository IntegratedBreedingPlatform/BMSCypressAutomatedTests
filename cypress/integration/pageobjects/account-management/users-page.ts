import { randomString, getIframeBody } from '../../../support/commands';

export default class UsersPage{

    protected cropName = Cypress.env('cropName');
    protected programName = Cypress.env('existingProgramName');
    roleName = "Breeder";

    openAddUserModal() {
        getIframeBody().find('table', {timeout: 30000}).should('be.visible');
        getIframeBody().find('[jhitranslate="site-admin.user.add"]').should('exist').contains('Add user').click();
    }

    createUser() {
        getIframeBody().find('[jhitranslate="site-admin.user.modal.create.header"]').contains('Create User').should('exist');
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
        getIframeBody().find('#roleTypeCombo').select("Program");
        cy.wait(100)
        
        getIframeBody().find('#roleNameCombo').should('exist').click()
        getIframeBody().find('input[class="select2-search__field"]').should('be.visible').type(this.roleName+'{enter}')

        getIframeBody().find('#cropCombo').should('exist').click()
        getIframeBody().find('input[class="select2-search__field"]').should('be.visible').type(Cypress.env('cropName')+'{enter}')
        
        getIframeBody().find('#programCombo').should('exist').click()
        getIframeBody().find('input[class="select2-search__field"]').should('be.visible').type(Cypress.env('existingProgramName')+'{enter}')
        getIframeBody().find('[jhitranslate="site-admin.user.modal.role.assign"]').contains('Assign role').should('be.visible').click();
    }

    saveNewUser() {
        cy.intercept('POST', `/bmsapi/users*`).as('addUser');
        getIframeBody().find('div.modal-footer > button').contains('Add user').should('be.visible').click();
    }

    checkAddUserSuccess() {
        cy.intercept('GET', `/bmsapi/users*`).as('searchUsers');
         cy.wait('@addUser').then((interception) => {
           expect(interception.response.statusCode).to.be.oneOf([200, 201]);
            getIframeBody().find('.alert-success').contains('User created successfully').should('be.visible');
        });
    }

    checkNewUserExists() {
        cy.intercept('POST', `/bmsapi/users/search*`).as('searchUsers');
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
