import { getIframeBody } from '../../../support/commands';

export default class ManageGermplasmPage{
    openGermplasm(){
        cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframeBody) => {
            cy.wrap($iframeBody).find('table > tbody > tr:nth-child(1) > td:nth-child(2) > a').should('exist').click().then(($a) => {
                const gid = $a.text();
                cy.wrap($iframeBody).find('[jhitranslate="germplasm-details.header"] > span').should('exist').contains('Germplasm Details:');
                cy.wrap($iframeBody).find('.modal-title').should('exist').contains('(GID: ' + gid + ')');
            });
        });
    }

    openImportGermplasmModal(){
        cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframeBody) => {
            cy.wrap($iframeBody).find('#actionMenu').click();
            cy.wrap($iframeBody).find('[jhitranslate="search-germplasm.actions.import"]').click().then(() => {
                cy.wrap($iframeBody).find('.modal-dialog').should('exist');
                cy.wrap($iframeBody).find('[jhitranslate="germplasm.import.header"] > span').contains('Import germplasm');
            });
        });
    }

    openGroupGermplasmModal(){
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[jhitranslate="search-germplasm.actions.group"]').click().then(() => {
            getIframeBody().find('.modal-dialog').should('exist');
            getIframeBody().find('[jhitranslate="germplasm-grouping.grouping-results"] > span').contains('Grouping Results');
        });
    }

    clickUngroupActionAndConfirm() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[jhitranslate="search-germplasm.actions.ungroup"]').click();
        cy.intercept('POST', `**/germplasm/ungrouping?*`).as('ungroup');
        getIframeBody().find('[data-test="modalConfirmButton"]').should('exist').click();
    }

    verifySuccessUngroupAction() {
        cy.wait('@ungroup').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('All selected germplasm were successfully unfixed.');
        });
    }

    selectAllCurrentPage() {
        getIframeBody().find('[data-test="checkSelectCurrentPage"]').click();
    }


}
