import { getIframeBody } from '../../../support/commands';

export default class GroupGermplasmPage{
    selectAllImportedEntries() {
        getIframeBody().find('[data-test="checkSelectCurrentPage"]').click();
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
        getIframeBody().find('table > tbody > tr.selected > td:nth-child(3) > a').should('have.attr', 'data-test', 'germplasmGroupIdLink');
    }
}
