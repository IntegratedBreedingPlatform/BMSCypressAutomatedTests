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
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListActionButton"]',{ timeout: Cypress.config('pageLoadTimeout') })
                .should('exist')
                .click();
            cy.wrap($iframe).find('[data-test="addEntriesButton"]').should('be.visible').click();
        });
    }

    getTotalCount() {
        getIframeBody().xpath(`//div[contains(@class,'active' ) and @aria-labelledby='germplasm-list-data-tab']//div[@class='info jhi-item-count']/span[1]`).invoke('text').as('totalCount');
    }

    verifyTotalCountChanged() {
        getIframeBody().xpath(`//div[contains(@class,'active' ) and @aria-labelledby='germplasm-list-data-tab']//div[@class='info jhi-item-count']/span[1]`).invoke('text').as('newTotalCount');
        expect(cy.get('@totalCount')).not.eq(cy.get('@newTotalCount'));
    }

    verifySuccessMessage() {
        getIframeBody().find('ngb-alert > span',{ timeout: 50000}).contains('Germplasm entries added to list successfully!');
    }

    /*
        Returns a radom value in range from 1 to 10
     */
    private getIntRandom(): number {
        return Math.floor(Math.random() * 9 + 1);
    }

}
