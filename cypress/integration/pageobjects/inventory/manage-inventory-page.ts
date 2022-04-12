import { getIframeBody } from '../../../support/commands';

export default class ManageInventoryPage{

    clickCreateInventoryLotsAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="createInventoryLotsButton"]').click();
    }

    clickImportInventoryLotsAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="importInventoryLotsButton"]').click();
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

    filterLotsByGID(gid:string) {
        getIframeBody().xpath('//select[@id="dropdownFilters"]').should('exist').select("gids");
        getIframeBody().find('[data-test="addFilterButton"]').click();
        getIframeBody().find('button.btn-info[title="GID :: All"]').should('be.visible').click();
        getIframeBody().xpath('//input[@placeholder="comma-separated values"]').should('be.visible').type(gid);
        this.interceptLotsSearchResultsLoad();
        getIframeBody().find('button.btn-primary').contains("Apply").click();
    }

    filterLotsByLocation(location:string){
        getIframeBody().xpath('//select[@id="dropdownFilters"]').should('exist').select("locationNameContainsString");
        getIframeBody().find('[data-test="addFilterButton"]').click();
        getIframeBody().find('button.btn-info[title="Storage Location :: All"]').should('be.visible').click();
        getIframeBody().xpath('//input[@placeholder="Contains Text"]').should('be.visible').type(location);
        this.interceptLotsSearchResultsLoad();
        getIframeBody().find('button.btn-primary').contains("Apply").click();
    }

    verifySuccessfulLotsFilter(recordsShouldExist: boolean){
        cy.wait('@lotsSearch').then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            getIframeBody().find('table > tbody > tr:first-of-type > td[jhitranslate="no.data"]')
                .should(recordsShouldExist ? "not.exist" : "exist");
        });
    }
}
