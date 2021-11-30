export default class LoginPage{

    performLogin() {
        this.launchLogin();
        this.enterValidCredentials()
        this.clickLogin()
        this.checkURLandToken(); 
    }

    launchLogin(){
        cy.visit('ibpworkbench/controller/auth/login');
    }

    getToken(item:string){
       return localStorage.getItem(item)
    }
    useToken(){
        if(this.getToken('bms.xAuthToken')==null){
            this.performLogin();        
        }
    }

    
    enterValidCredentials() {
        this.enterUsername(Cypress.env('username'));
        this.enterPassword(Cypress.env('password'));
    }

    enterUsername(username:string){
        cy.get('.js-login-username').type(username);
    }
    enterPassword(password:string){
        cy.get('.js-login-password').type(password);
    }

    clickLogin(){
        cy.get('.js-login-form').submit();
    }

    verifyPageLoaded() {
        cy.get('.js-login-username').should('exist')
        cy.get('.js-login-password').should('exist')
    }

    checkURLandToken(){
        cy.url({ log: true }).should('include', '/app', () => {
            expect(localStorage.getItem('bms.xAuthToken')).to.exist
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

    checkBMSVersion(){
        let bmsVersion = Cypress.env('bmsVersion');
        cy.xpath(`//span[contains(text(), '${bmsVersion}')]`).should('exist');
    }

    goToResetPasswordPage() {
        cy.get('.ac-login-forgot-password').should('exist').click();
    }

    

    
}