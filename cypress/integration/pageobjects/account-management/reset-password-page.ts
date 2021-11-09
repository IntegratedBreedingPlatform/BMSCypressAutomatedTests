export default class ResetPasswordPage{

    enterValidCredentials() {
        this.enterEmail(Cypress.env('userEmail'));
        this.enterUsername(Cypress.env('username'));
    }

    enterUsername(username:string){
        cy.get('.js-login-username').type(username);
    }

    enterEmail(email:string){
        cy.get('.js-login-forgot-password-input').type(email);
    }

    clickContinue(){
        cy.get('.js-login-form').submit();
        cy.intercept('POST', `ibpworkbench/controller/auth/sendResetEmail`).as('sendResetEmail');
    }

    verifySendResetEmail() {
        cy.wait('@sendResetEmail').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            cy.get('.login-forgot-password-email-notify').should('exist').should('be.visible')
                .should(($sp) => {expect($sp).to.have.text('BMS has sent you an e-mail with a link to update your password. ' +
                    'If you don\'t receive the e-mail within several minutes, please check your spam folder as it may have gotten there.')});
            // Verify UI shows login page
            cy.get('.js-login-forgot-password-input').should('not.be.visible');
            cy.get('.js-login-password').should('be.visible');
            cy.xpath(`//div/span[@class='login-submit-label' and text()='Sign In']`).should('be.visible');
        });
    }

    

    
}