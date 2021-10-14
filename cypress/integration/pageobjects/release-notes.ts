export default class ReleaseNotes{
    verifyReleaseNotesDisplayed() {
        this.getReleaseNotesIframe();
        this.getReleaseNotesBody();
    }

    verifyReleaseNotesNotDisplayed() {
        cy.xpath('//jhi-release-notes-wrapper/iframe').should('not.exist');
    }

    getReleaseNotesBody() {
        return this.getReleaseNotesBody()
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
            this.getReleaseNotesBody().find('#dontShowAgain').should('exist').check();
        } else {
            this.getReleaseNotesBody().find('#dontShowAgain').should('exist').uncheck();
        }
    }
}