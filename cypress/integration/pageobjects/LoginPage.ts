class Login{

    launchLogin(){
        cy.visit('ibpworkbench/controller/auth/login');
    }

    enterUsername(){
        cy.get('.js-login-username').type(Cypress.env('username'));
    }
    enterPassword(){
        cy.get('.js-login-password').type(Cypress.env('password'));
    }

    clickLogin(){
        cy.get('.js-login-form').submit();
    }

    checkURLandToken(){
        cy.url({ log: true }).should('include', '/app', () => {
            expect(localStorage.getItem('bms.xAuthToken')).to.exist()
        })
    }

    checkIfCookieExist(cookieName:string){
        cy.getCookie(cookieName)
        .should('exist')
        .then((cookie)=>{
            expect(cookie?.httpOnly).to.equal(true);
            expect(cookie?.secure).to.equal(true);
            expect(cookie?.sameSite).to.equal("strict");
        })
        }

        checkLoginTagVersion(){
            cy.xpath('//span[contains(text(), "19.0")]').should('exist');
        }
    }

    

    
}
export default Login