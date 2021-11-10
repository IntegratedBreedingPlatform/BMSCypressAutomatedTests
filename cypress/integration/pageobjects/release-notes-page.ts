export default class ReleaseNotesPage {
    resetReleaseNoteUserShowAgainValueTo1() {
        var query = "UPDATE release_note_user rnu "
            + "INNER JOIN users u ON u.userid = rnu.user_id "
            + "SET rnu.show_again = 1 WHERE u.uname=\"" + Cypress.env('username') + "\"";
        cy.task('queryWorkbenchDB', query);
    }

    verifyReleaseNotesDisplayed() {
        this.getReleaseNotesIframe();
        this.verifyReleaseNotesHeaderDisplayed();
    }

    verifyReleaseNotesNotDisplayed() {
        cy.xpath('//jhi-release-notes-wrapper/iframe').should('not.exist');
    }

    verifyReleaseNotesHeaderDisplayed() {
        this.getReleaseNotesBody()
            .find('jhi-main > div > section > jhi-release-notes-dialog > div.modal-header > h4 > span > span')
            .should('exist');
    }
     getReleaseNotesBody() {
         return this.getReleaseNotesIframe().its('0.contentDocument').should('exist').its('body').then(cy.wrap);
     }

    getReleaseNotesIframe() {
        return cy.xpath('//jhi-release-notes-wrapper/iframe').should('exist');
    }

    clickOk() {
        this.getReleaseNotesBody()
            .find('jhi-main > div > section > jhi-release-notes-dialog > div.modal-footer > button')
            .should('exist').click();
    }

    setDontShowAgainValue(checked: boolean) {
        if(checked) {
            this.getDontShowAgainCheckBox().check();
        } else {
            this.getDontShowAgainCheckBox().uncheck();
        }
    }

    getDontShowAgainCheckBox() {
        return this.getReleaseNotesBody().find('#dontShowAgain', {timeout:50000}).should('exist');
    }
}