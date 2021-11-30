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

    /*
        Returns a radom value in range from 1 to 10
     */
    private getIntRandom(): number {
        return Math.floor(Math.random() * 9 + 1);
    }

}
