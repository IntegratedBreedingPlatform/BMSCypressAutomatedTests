import { getAccessToken, getIframeBody, getProgramByName } from '../../../support/commands';

export default class ManageGermplasmPage{

    goToPage(page: number) {
        getIframeBody().xpath(`//div[@data-test='germplasmSearchResultsTablePagination']//li/a[text()=' ${page} ']`).click();
    }

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

    clickAddToExistingListAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[jhitranslate="search-germplasm.actions.add-to-list"]').click();
    }

    clickCreateNewListAction() {
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[jhitranslate="search-germplasm.actions.create-list"]').click();
    }

    verifyAddToEntriesListModalIsDisplayed() {
        getIframeBody().find('jhi-germplasm-list-add').scrollIntoView().should('be.visible');
        
    }

    verifySuccessUngroupAction() {
        cy.wait('@ungroup').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('All selected germplasm were successfully unfixed.');

            // Verify the groupId column is empty (-)
            getIframeBody().find(`tbody[id="cdk-drop-list-1"] > tr`).each(($el) => {
                cy.wrap($el).xpath('td[position()=3]/span[text()="-"]').should('exist');
            });
              
        });
    }

    verifyAlertMessage(message: string) {
        getIframeBody().find('ngb-alert > span').contains(message);
    }

    selectAllCurrentPage() {
        getIframeBody().find('[data-test="checkSelectCurrentPage"]').click();
    }

    selectRandomGermplasm() {
        this.waitForGermplasmSearchResultsToLoad().then(() => {
            // select 3 random germplasm in the first page
            getIframeBody().xpath(`(//table[@data-test="germplasmSearchResultsTable"]//tbody//input)[${Math.floor(Math.random() * 9) + 1}]`).check();
            getIframeBody().xpath(`(//table[@data-test="germplasmSearchResultsTable"]//tbody//input)[${Math.floor(Math.random() * 9) + 1}]`).check();
            getIframeBody().xpath(`(//table[@data-test="germplasmSearchResultsTable"]//tbody//input)[${Math.floor(Math.random() * 9) + 1}]`).check();
        });
    }

    filterByGid(gid: string) {
        this.waitForGermplasmSearchResultsToLoad().then(() => {
            getIframeBody().find('button[title^="GID ::"]').click();
            getIframeBody().find('input[data-test="columnFilterListInput"]').should('exist').type(gid);
            getIframeBody().find('button[data-test="columnFilterListApplyButton"]').contains("Apply").click();
        });
    }

    filterByListName(listName: string) {
        this.waitForGermplasmSearchResultsToLoad().then(() => {
            getIframeBody().find('#dropdownFilters').select('Germplasm List');
            getIframeBody().find('[data-test="addFilterButton"]').click();
            
            getIframeBody().find('button[title^="Germplasm List ::"]').click();
    
            // Browse for list modal popup
            getIframeBody().find('[data-test="treeTableModalBody"]').should('be.visible');
            getIframeBody().xpath(`//td//span[text()="${listName}"]`).click();
            getIframeBody().find('button[data-test="treeTableOkButton"]').click();
        });
    }

    clickSaveList(listName: string) {
        return new Cypress.Promise((resolve, reject) => {
            getIframeBody().then(($iframe) => {
                cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/germplasm-lists?programUUID=*`).as('saveList');
                // Select "Program list" node
                cy.wrap($iframe).find('p-tree > div > ul > p-treenode:nth-child(2) > li.ui-treenode > div').should('exist').click();
                cy.wrap($iframe).find('[data-test="name"]').type(listName);
                cy.wrap($iframe).find('[data-test="saveList"]').click();
                cy.wait('@saveList').then(({response}) => {
                    expect(response?.statusCode).to.be.oneOf([200, 201]);
                    resolve(response?.body.listId);
                });
            });
        });
    }

    waitForGermplasmSearchResultsToLoad() {
        return new Cypress.Promise((resolve, reject) => {
            cy.intercept('GET', `bmsapi/crops/${Cypress.env('cropName')}/germplasm/search?programUUID=*`).as('germplasmSearch');
            cy.wait('@germplasmSearch', { timeout: 15000 }).then(() => {
                resolve();
            });
        });
    }

    toggleListStatus(listId: any) {
        getProgramByName(Cypress.env('existingProgramName')).then((program: any) => {
            cy.request({
                method: 'POST',
                url: `bmsapi/crops/${Cypress.env('cropName')}/germplasm-lists/${listId}/toggle-status?programUUID=${program.programDbId}`,
                headers: {
                  'X-Auth-Token': getAccessToken()
                }
              });
        });
    }

}

