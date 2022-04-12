import { getIframeBody } from '../../../support/commands';

export default class ManageInventoryPage{

    viewTransactionsTab(){
        getIframeBody().xpath('//a[text()="View Transactions"]').click();
    }

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

    interceptTransactionsSearchResultsLoad() {
        cy.intercept('GET', `bmsapi/crops/${Cypress.env('cropName')}/transactions/search?programUUID=*`).as('transactionsSearch');
    }

    waitForLotsSearchResultsToLoad() {
        return new Cypress.Promise((resolve, reject) => {
            this.interceptLotsSearchResultsLoad();
            cy.wait('@lotsSearch', { timeout: 15000 }).then(() => {
                resolve();
            });
        });
    }

    waitForTransactionsSearchResultsToLoad() {
        return new Cypress.Promise((resolve, reject) => {
            this.interceptTransactionsSearchResultsLoad();
            cy.wait('@transactionsSearch', { timeout: 15000 }).then(() => {
                resolve();
            });
        });
    }

    filterByGID(gid:string) {
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

    filterTransactionsByType(type:string){
        getIframeBody().find('button.btn-info[title="Transaction type :: All"]').should('be.visible').click();
        getIframeBody().contains('label', type).invoke('attr', 'for').then((id) => {
            getIframeBody().find('#' + id).click();
        });
        this.interceptTransactionsSearchResultsLoad();
        getIframeBody().find('[data-test="applyFilterButton"]').click();
    }

    filterTransactionsByStatus(status:string){
        getIframeBody().find('button.btn-info[title="Transaction status :: All"]').should('be.visible').click();
        getIframeBody().contains('label', status).invoke('attr', 'for').then((id) => {
            getIframeBody().find('#' + id).click();
        });
        this.interceptTransactionsSearchResultsLoad();
        getIframeBody().find('[data-test="applyFilterButton"]').click();
    }

    verifySuccessfulLotsFilter(recordsShouldExist: boolean){
        cy.wait('@lotsSearch').then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            getIframeBody().find('table > tbody > tr:first-of-type > td[jhitranslate="no.data"]')
                .should(recordsShouldExist ? "not.exist" : "exist");
        });
    }

    verifySuccessfulTransactionsFilter(recordsShouldExist: boolean){
        cy.wait('@transactionsSearch').then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            getIframeBody().find('table > tbody > tr:first-of-type > td[jhitranslate="no.data"]')
                .should(recordsShouldExist ? "not.exist" : "exist");
        });
    }
}
