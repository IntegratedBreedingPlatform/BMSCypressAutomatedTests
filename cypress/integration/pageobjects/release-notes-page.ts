export default class ReleaseNotesPage {
    resetReleaseNoteUserShowAgainValueTo1() {
        cy.request({
            method: 'PUT',
            url: '/bmsapi/release-notes/toggle?showAgain=' + true,
            headers: {
                'X-Auth-Token': JSON.parse(localStorage.getItem('bms.xAuthToken')).token
            }
        });
    }

    verifyReleaseNotesDisplayed() {
        this.getReleaseNotesBody();
    }

    verifyReleaseNotesNotDisplayed() {
        cy.xpath('//jhi-release-notes-wrapper/iframe').should('not.exist');
    }

    getReleaseNotesBody() {
        return cy.xpath('//jhi-release-notes-wrapper/iframe').its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap);
    }

    clickOk() {
        this.getReleaseNotesBody().then(($iframe) => {
            cy.wrap($iframe).find('jhi-main > div > section > jhi-release-notes-dialog > div.modal-footer > button')
                .should('exist').click();
        });
    }

    setDontShowAgainValue(checked: boolean) {
        this.getReleaseNotesBody().then(($iframe) => {
            if(checked) {
                cy.wrap($iframe).find('#dontShowAgain').should('exist').check();
            } else {
                cy.wrap($iframe).find('#dontShowAgain').should('exist').uncheck();
            }

        });

    }
}