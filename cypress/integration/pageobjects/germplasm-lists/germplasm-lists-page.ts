import { getIframeBody } from '../../../support/commands';

export default class GermplasmListPage {

    openAddEntryDetailsModal() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="addEntryDetailsButton"]', { timeout: Cypress.config('pageLoadTimeout') })
                .should('exist')
                .click();
        });
    }

    checkEntryDetailWasAdded(variableName: string) {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="entryDetailsTable"] > tbody > tr > td:nth-child(2)')
                .should('exist')
                .contains(variableName);
        });
    }

    checkGermplasmListTableHasColumn(columnName: string) {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListTable"] > thead > tr > th:last-child > span > span:nth-child(1)')
                .should('exist')
                .contains(columnName);
        });
    }

    enterEntryDetailValue() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="germplasmListTable"] > tbody > tr:first-of-type > td:last-child > jhi-list-data-row')
                .should('exist')
                .click()
                .then(($row) => {
                    const entryDetailValue: string = "1";
                    cy.wrap($row).find('jhi-inline-editor > form > div > input')
                        .should('exist')
                        .clear()
                        .type(entryDetailValue)
                        .type('Cypress.io{enter}');
                    cy.wrap($row).find('div.editable').contains(entryDetailValue);
                });
        });
    }

}
