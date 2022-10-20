import { getIframeBody } from '../../../support/commands';

export default class ManageInventoryPage{

    viewTransactionsTab(){
        getIframeBody().find('[data-test="viewTransactionsLink"]').click();
    }

    clickCreateInventoryLotsAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="createInventoryLotsButton"]').click();
    }

    clickImportInventoryLotsAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="importInventoryLotsButton"]').click();
    }

    clickDepositInventoryAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="depositInventoryLotsButton"]').click();
    }

    clickWithdrawInventoryAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="withdrawInventoryLotsButton"]').click();
    }

    clickConfirmTransactionsAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[data-test="confirmTransactionsButton"]').click();
    }

    clickModalConfirmButton() {
        getIframeBody().find('[data-test="modalConfirmButton"]').click();
    }

    interceptTransactionConfirmation() {
        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/transactions/confirmation`).as('transactionsConfirmation');
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
            cy.wait('@transactionsSearch', { timeout: 15000 }).then(() => {
                resolve();
            });
        });
    }

    filterByGermplasmList(listName:string) {
        getIframeBody().xpath('//select[@id="dropdownFilters"]').should('exist').select("germplasmListIds");
        getIframeBody().find('[data-test="addFilterButton"]').click();
        getIframeBody().find('button.btn-info[title="Germplasm List :: All"]').should('be.visible').click();
        cy.wait(2000);
        getIframeBody().xpath(`//span[@data-test="listName" and text()='${listName}']`, { timeout: 15000 }).click();
        this.interceptLotsSearchResultsLoad();
        getIframeBody().find('[data-test="selectListButton"]').click();
    }

    filterByGID(gid:string) {
        getIframeBody().xpath('//select[@id="dropdownFilters"]').should('exist').select("gids");
        getIframeBody().find('[data-test="addFilterButton"]').click();
        getIframeBody().find('button.btn-info[title="GID :: All"]').should('be.visible').click();
        getIframeBody().xpath('//input[@placeholder="comma-separated values"]').should('be.visible').type(gid);
        this.interceptLotsSearchResultsLoad();
        getIframeBody().find('button.btn-primary').contains("Apply").click();
    }

    filterByLotUID(lotUID:string) {
        cy.intercept('GET', `bmsapi/crops/${Cypress.env('cropName')}/lots/search?programUUID=*`).as('filterByLotUID');
        return new Cypress.Promise((resolve, reject) => {
            getIframeBody().xpath('//select[@id="dropdownFilters"]').should('exist').select("lotUUIDs");
            getIframeBody().find('[data-test="addFilterButton"]').click();
            getIframeBody().find('button.btn-info[title="Lot UID :: All"]').should('be.visible').click();
            getIframeBody().xpath('//input[@placeholder="Match Text"]').should('be.visible').type(lotUID);
            getIframeBody().find('button.btn-primary').contains("Apply").click();
            cy.wait('@filterByLotUID', { timeout: 15000 }).then(() => {
                resolve();
            });
        });
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
            expect(interception.response?.statusCode).to.be.equal(200);
            getIframeBody().find('table > tbody > tr:first-of-type > td[jhitranslate="no.data"]')
                .should(recordsShouldExist ? "not.exist" : "exist");
        });
    }

    verifySuccessfulTransactionsFilter(recordsShouldExist: boolean){
        cy.wait('@transactionsSearch').then((interception) => {
            expect(interception.response?.statusCode).to.be.equal(200);
            getIframeBody().find('table > tbody > tr:first-of-type > td[jhitranslate="no.data"]')
                .should(recordsShouldExist ? "not.exist" : "exist");
        });
    }

    verifyTransactionsConfirmation() {
        cy.wait('@transactionsConfirmation').then((interception) => {
            expect(interception.response?.statusCode).to.be.equal(200);
            getIframeBody().find('ngb-alert > span').contains('The transactions were confirmed successfully.');
        });
    }

    toggleCheckboxesForCurrentPage(check: boolean) {
        let selectAllCurrentPage = getIframeBody().find('input[title="select current page"]').should('be.visible');
        if (check) {
            selectAllCurrentPage.check();
        } else {
            selectAllCurrentPage.uncheck();
        }
    }
}
