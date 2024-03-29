import { getIframeBody } from '../../../support/commands';

export default class GroupGermplasmPage{
    selectAllImportedEntries() {
        cy.wait('@loadGermplasms').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('[data-test="checkSelectCurrentPage"]').click();
        }
    }

    confirmGermplasmGrouping() {
        getIframeBody().find('[data-test="continueGroupingButton"]').click();
        getIframeBody().find('[data-test="confirmGroupButton"]').click();
    }

    verifySuccessMessage() {
        getIframeBody().find('ngb-alert > span',{ timeout: 50000}).contains('Successfully marked selected germplasm as fixed.');
    }

    verifyGroupIdExists() {
        getIframeBody().find('[data-test="groupIdHeader"]').should('exist');
        getIframeBody().find('table > tbody > tr.selected > td:nth-child(4) > a').should('have.attr', 'data-test', 'germplasmGroupIdLink');
    }
}
