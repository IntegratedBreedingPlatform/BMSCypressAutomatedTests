import { closeReleaseNotePopupIfShown } from '../../support/commands';

export default class NavbarSection {

    clickAddProgram(){
        closeReleaseNotePopupIfShown();
        cy.xpath('//body/jhi-main/div/section/jhi-navbar/div/mat-toolbar/button[3]/span').should('exist').click();
    }


    clickSiteAdmin() {
        closeReleaseNotePopupIfShown();
        cy.xpath('//body/jhi-main/div/section/jhi-navbar/div/mat-toolbar/button[2]/span').should('exist').click();
    }

    signOut() {
        closeReleaseNotePopupIfShown();
        cy.xpath('//body/jhi-main/div/section/jhi-navbar/div/mat-toolbar/button[5]/span').should('exist').click();
        cy.xpath('//body/div[2]/div[2]/div/div/div/button').should('exist').should(($sp) => {expect($sp).to.have.text('Sign out')}).click();
    }

    openUserProfilePopup() {
        closeReleaseNotePopupIfShown();
        cy.get('[data-test="userProfileMenu"]', {timeout: 5000}).should('exist').click();
        cy.get('[data-test="openUserProfileButton"]').should('exist').click();
    }
}
