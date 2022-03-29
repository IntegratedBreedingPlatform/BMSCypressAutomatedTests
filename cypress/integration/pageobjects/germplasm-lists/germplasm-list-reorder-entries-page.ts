import { getIframeBody } from '../../../support/commands';

export default class GermplasmListReorderEntriesPage {
    private gid: string | undefined;

    specifyPosition(positionNumber="1") {
        getIframeBody().find('[data-test="fixedPositionOption"]').click();
        getIframeBody().find('[data-test="fixedPositionNumberInput"]')
            .should('be.enabled')
            .type(positionNumber);
        cy.intercept('PUT', `**/entries/reorder?*`).as('reorderEntries');
        getIframeBody().find('[data-test="submitReorderEntriesButton"]').click();
    }

    verifySuccessReorderEntries () {
        cy.wait('@reorderEntries').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('Successfully reorder of entries.');
        })
    }

    verifyPositionChanged (positionNumber="1") {
        var index = parseInt(positionNumber) - 1;
        getIframeBody().find('[data-test="germplasmListTable"] > tbody > tr').eq(index).then((row) => {
            cy.wrap(row).find(`jhi-list-data-row > div > span > a`).first().should('have.text', this.gid);
        });
    }

    selectRandomEntry() {
        var randIndex = Math.floor(Math.random() * 20) + 1;
        getIframeBody().xpath(`(//table[@data-test="germplasmListTable"]//tbody//tr)[${randIndex}]`).then((row) => {
            cy.wrap(row).find(`input`).check();
            cy.wrap(row).find(`jhi-list-data-row > div > span > a`).first().invoke('text').then (text => {
                this.gid = text;
            });
        });
    }
}
