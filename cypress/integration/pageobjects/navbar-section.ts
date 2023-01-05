import { closeReleaseNotePopupIfShown } from '../../support/commands';

export default class NavbarSection {

    clickAddProgram(){
        closeReleaseNotePopupIfShown();
        cy.get('[data-test="addProgramButton"]').should('exist').click();
    }


    clickSiteAdmin() {
        closeReleaseNotePopupIfShown();
        cy.get('[data-test="siteAdminButton"]').should('exist').click();
    }

    signOut() {
        closeReleaseNotePopupIfShown();
        cy.get('[data-test="userProfileMenu"]').should('exist').click();
        cy.get('[data-test="signOutButton"]').should('exist').click();
    }

    openUserProfilePopup() {
        cy.get('[data-test="userProfileMenu"]', {timeout: 5000}).should('exist').click();
        cy.get('[data-test="openUserProfileButton"]').should('exist').click();
    }
}
