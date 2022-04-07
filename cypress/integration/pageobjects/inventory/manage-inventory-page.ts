import { getIframeBody } from '../../../support/commands';

export default class ManageInventoryPage{

    clickCreateInventoryLotsAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="createInventoryLotsButton"]').click();
    }

    interceptLotsSearchResultsLoad() {
        cy.intercept('GET', `bmsapi/crops/${Cypress.env('cropName')}/lots/search?programUUID=*`).as('lotsSearch');
    }

    waitForSearchResultsToLoad() {
        return new Cypress.Promise((resolve, reject) => {
            this.interceptLotsSearchResultsLoad();
            cy.wait('@lotsSearch', { timeout: 15000 }).then(() => {
                resolve();
            });
        });
    }
}
