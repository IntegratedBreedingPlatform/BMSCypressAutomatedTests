import { getIframeBody } from '../../../support/commands';
import * as path from 'path';

export default class GermplasmListsBetaPage {

    openImportGermplasmListModal() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="actionMenu"]', { timeout: Cypress.config('pageLoadTimeout') })
                .should('exist')
                .click();
            cy.wrap($iframe).find('[data-test="importListButton"]').should('exist').click();
        });
    }

    openGermplasmList(){
        cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframe) => {
            this.selectFirstList();
        });
    }

    verifyImportTemplateDownload() {
        const downloadsFolder = Cypress.config("downloadsFolder");
        // TODO clear downloads https://github.com/cypress-io/cypress/issues/14886
        cy.readFile(path.join(downloadsFolder, "GermplasmListImportTemplate.xls")).should("exist");
    }

    verifyImportCancelled() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('.modal').should('not.exist');
        });
    }

    selectListFilteredByNumberOfEntries() {
        getIframeBody().find('jhi-column-filter > div > div > div > div > a').contains("reset all filters")
            .should("exist")
            .click();
        getIframeBody().xpath('//select[@id="dropdownFilters"]').should('exist').select("numberOfEntriesRange");
        getIframeBody().find('button.fa-plus').click();
        getIframeBody().find('button.btn-info[title="Number Of Entries Range :: All"]').should('be.visible').click();
        getIframeBody().xpath('//input[@id="from"]').should('exist').type("20");

        this.filterAndSelectFirstResult();
    }

    selectListFilteredByListName(listName:string) {
        this.filterByListName(listName);
        this.filterAndSelectFirstResult();
    }

    filterByListName(listName:string) {
        getIframeBody().find('jhi-column-filter > div > div > div > div > a').contains("reset all filters")
            .should("exist")
            .click();
        getIframeBody().find('button.btn-info[title="List Name :: All"]').should('be.visible').click();
        getIframeBody().xpath('//input[@placeholder="Search Text"]').should('be.visible').type(listName);
    }

    filterAndVerifyResult(listName:string, condition:string) {
        this.filterByListName(listName);
        cy.intercept('POST', `**/germplasm-lists/search?*`).as('filterList');
        getIframeBody().find('button.btn-primary').contains("Apply").click();
        cy.wait('@filterList').then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            getIframeBody().find('table > tbody > tr:first-of-type > td[jhitranslate="no.data"]')
                .should(condition);
        });
    }

    filterAndSelectFirstResult() {
        cy.intercept('POST', `**/germplasm-lists/search?*`).as('filterList');
        getIframeBody().find('button.btn-primary').contains("Apply").click();
        cy.wait('@filterList').then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            this.selectFirstList();
        });
    }

    selectFirstList() {
        getIframeBody().find('[data-test="germplasmListSearchTable"] > tbody > tr:first-of-type > td:first-of-type > a')
            .should('exist')
            .click()
            .then(($a) => {
                const listName = $a.text();

                getIframeBody().find('jhi-germplasm-list > section > div > section > nav > ul > li:nth-child(2) > a')
                    .should('exist')
                    .contains(listName);
            });
    }
}
