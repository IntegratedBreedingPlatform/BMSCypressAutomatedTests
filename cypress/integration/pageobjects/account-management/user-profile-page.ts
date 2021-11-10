export default class UserProfilePage{

    updateAll(firstNameParam:string, lastNameParam:string, emailParam:string){
        cy.get('jhi-user-profile-update-dialog').should('exist');
        cy.get('#firstName').clear().type(firstNameParam);
        cy.get('#lastName').clear().type(lastNameParam);
        cy.get('#email').clear().type(emailParam);
    }

    updateDetails() {
        this.updateAll(testFirstName, testLastName, testEmail);
    }

    enterPassword(){
        cy.get('#password').type(Cypress.env('password'));
    }

    clickUpdate(){
        cy.intercept('PATCH', `/bmsapi/my-profile`).as('updateProfile');
        cy.get('.btn-primary').click();
    }


    verifySuccessfulUpdate() {
        cy.wait('@updateProfile').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            cy.get('.alert-success').should('exist').should('be.visible');
            cy.get('.alert-danger').should('not.exist');
        });
    }

    verifyProfileDetails(){
        cy.xpath('//body/div[2]/div[2]/div/div/div/div/div/button/span/span').should('exist')
            .should(($sp) => {expect($sp).to.have.text(testFirstName + ' ' + testLastName)});
        cy.xpath('//body/div[2]/div[2]/div/div/div/div/div[1]/h6').should('exist').should(($sp) => {expect($sp).to.have.text(testEmail)});
    }

}

const testFirstName = 'FirstName-' + Math.random().toString(20).replace(/[^a-z]+/g, '');
const testLastName = 'LastName-' + Math.random().toString(20).replace(/[^a-z]+/g, '');
const testEmail = 'user-' + Math.random().toString(20).replace(/[^a-z]+/g, '') + '@leafnode.io';
