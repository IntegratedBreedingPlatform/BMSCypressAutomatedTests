import { getIframeBody } from '../../../support/commands';
import AddEntryDetailsContext from '../../tests/manage-lists/add-entry-details/add-entry-details.context';

export default class GermplasmListPage {

    private entryDetailValue: number = this.getIntRandom();

    constructor(private addEntryDetailsContext: AddEntryDetailsContext) {
    }

    openAddEntryDetailsModal() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="addEntryDetailsButton"]', { timeout: Cypress.config('pageLoadTimeout') })
                .should('exist')
                .click();
        });
    }

    checkEntryDetailWasAdded() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="entryDetailsTable"] > tbody > tr > td:nth-child(2) > a')
                .should('exist')
                .contains(<string>this.addEntryDetailsContext.variableName);
        });
    }

    checkGermplasmListTableHasColumn() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListTable"] > thead > tr > th:last-child > span > span:nth-child(1)')
                .should('exist')
                .contains(<string>this.addEntryDetailsContext.variableName);
        });
    }

    enterEntryDetailValue() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListTable"] > tbody > tr:first-of-type > td:last-child > jhi-list-data-row')
                .should('exist')
                .click()
                .then(($row) => {
                    cy.wrap($row).find('jhi-inline-editor > form > div > input')
                        .should('exist')
                        .clear()
                        .type(this.entryDetailValue.toString())
                        .type('Cypress.io{enter}');
                });
        });
    }

    checkEntryDetailValue() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListTable"] > tbody > tr:first-of-type > td:last-child > jhi-list-data-row')
                .should('exist')
                .then(($row) => {
                    cy.wrap($row).find('div.editable').contains(this.entryDetailValue.toString());
                });
        });
    }

    openAddNewEntries() {
        cy.intercept('GET', `bmsapi/crops/${Cypress.env('cropName')}/germplasm/search?programUUID=*`).as('loadEntriesModal');
        this.openGermplasmListAction("addEntriesButton");
    }

    getTotalCount() {
        getIframeBody().xpath(`(//span[@data-test="totalCount"])[1]`).invoke('text').as('totalCount');
    }

    verifyTotalCountChanged() {
        getIframeBody().xpath(`(//span[@data-test="totalCount"])[1]`).invoke('text').as('newTotalCount');
        expect(cy.get('@totalCount')).not.eq(cy.get('@newTotalCount'));
    }

    verifySuccessMessage() {
        cy.wait('@loadList',{ timeout: 60000}).then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            getIframeBody().find('ngb-alert > span',{ timeout: 120000}).contains('Germplasm entries added to list successfully!',{ timeout: 120000});
        });
    }

    selectRandomEntries() {
        // select 3 random entries in the first page
        getIframeBody().xpath(`(//table[@data-test="germplasmListTable"]//tbody//input)[${Math.floor(Math.random() * 20) + 1}]`).check();
        getIframeBody().xpath(`(//table[@data-test="germplasmListTable"]//tbody//input)[${Math.floor(Math.random() * 20) + 1}]`).check();
        getIframeBody().xpath(`(//table[@data-test="germplasmListTable"]//tbody//input)[${Math.floor(Math.random() * 20) + 1}]`).check();
    }

    filterByGid() {
        getIframeBody().find('[data-test="germplasmListTable"] > tbody > tr:first-of-type > td:nth-of-type(3) > jhi-list-data-row > div > span > a').should('exist').invoke("text").then((gid: string) => {
            getIframeBody().find('[data-test="germplasmListTable"] > thead > tr:first-of-type > th:nth-of-type(3) > jhi-column-filter-inline > i').click();
            getIframeBody().find('input[data-test="columnFilterListInput"]').should('exist').type(gid);
            
            cy.intercept('GET', `**/search?*`).as('filterList');
            getIframeBody().find('button[data-test="columnFilterListApplyButton"]').contains("Apply").click();

            cy.wait('@filterList').then((interception) => {
                expect(interception.response.statusCode).to.be.equal(200);
            });
        });
    }

    selectAllEntriesCurrentPage() {
        getIframeBody().find('[data-test="selectCurrentPageCheckbox"]').should('be.visible').check();
    }

    openAddToList() {
        this.openGermplasmListAction("addToListButton");
    }

    deleteList() {
        this.openGermplasmListAction("deleteListButton");
    }

    cloneList() {
        this.openGermplasmListAction("cloneListButton");
    }

    openGermplasmListAction(actionButtonName: string) {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListActionButton"]',{ timeout: Cypress.config('pageLoadTimeout') })
                .should('exist')
                .click();
            cy.wrap($iframe).find(`[data-test="${actionButtonName}"]`).should('be.visible').click();
        });
    }

    lockList() {
        getIframeBody().find('[data-test="lockListButton"]').click();
        getIframeBody().find('[data-test="lockListIcon"]')
            .should('have.class', 'fa-lock');
    }

    openEditListMetadata() {
        getIframeBody().find('[data-test="editListMetadataButton"]').click();
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('.modal').should('exist');
        });
    }

    /*
        Returns a radom value in range from 1 to 10
     */
    private getIntRandom(): number {
        return Math.floor(Math.random() * 9 + 1);
    }

}
