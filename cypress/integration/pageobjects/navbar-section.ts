export default class NavbarSection {

    clickAddProgram(){
        cy.xpath('//body/jhi-main/div/section/jhi-navbar/div/mat-toolbar/button[3]/span').should('exist').click();
    }


    clickSiteAdmin() {
    }

    signOut() {
       this.expandUserActionSection();
        cy.xpath('//body/div[2]/div[2]/div/div/div/button').should('exist').should(($sp) => {expect($sp).to.have.text('Sign out')}).click();
    }

    openUserProfilePopup() {
        this.expandUserActionSection();
        cy.xpath('//body/div[2]/div[2]/div/div/div/div/div/button').should('exist').should(($sp) => {expect($sp).to.have.class('mat-icon-button')}).click();
    }

    expandUserActionSection() {
        cy.xpath('//body/jhi-main/div/section/jhi-navbar/div/mat-toolbar/button[5]/span').should('exist').click();
    }
}