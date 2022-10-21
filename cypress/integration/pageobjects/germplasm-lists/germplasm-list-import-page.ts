import { getIframeBody } from '../../../support/commands';

export default class GermplasmListImportPage {

    importNewList(listName: string) {
        this.selectFile(listName);
        this.clickImportNext();
        this.clickNextEntryDetails();
        this.clickImportSubmit();
        this.selectFirstMatch();
        this.clickImportConfirm();
        this.clickSaveList(listName);
        this.verifyListCreated(listName);
    }

    selectFile(listName: string, fileName: string) {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="importFileInput"]').should('exist').then((input) => {
                cy.fixture(fileName, 'binary')
                    .then(Cypress.Blob.binaryStringToBlob)
                    .then((fileContent) => {
                        cy.wrap(input).attachFile({
                            fileContent,
                            fileName,
                            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            encoding: 'utf8',
                            lastModified: new Date().getTime()
                        });
                    });
                    cy.wait(50);
            });
        });
    }

    clickImportNext() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="importFileNext"]').click();
        });
    }

    clickImportSubmit() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="importSubmit"]').should('exist').click();
        });
    }

    clickNextEntryDetails() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('jhi-germplasm-list-variable-matches > div.modal-footer > button.btn.btn-primary').should('exist').click();
        });
    }

    selectFirstMatch() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('jhi-germplasm-list-import-multi-matches table tr:nth-child(1)').should('exist').click();
            cy.wrap($iframe).xpath('//jhi-germplasm-list-import-multi-matches//button/span/span[contains(text(), "Next")]').should('exist').click();
        });
    }

    clickImportConfirm() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="modalConfirmButton"]').should('exist').click();
        });
    }

    clickSaveList(listName: string) {
        getIframeBody().then(($iframe) => {
            // Select "Program list" node
            cy.wrap($iframe).find('p-tree > div > ul > p-treenode:nth-child(2) > li.ui-treenode > div').should('exist').click();
            cy.wrap($iframe).find('[data-test="name"]').type(listName);
            cy.wrap($iframe).find('[data-test="saveList"]').click();
        });
    }

    verifyListCreated(listName: string) {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('jhi-germplasm-list-search').contains(listName);
        });
    }

    openImportListClickTemplate() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="downloadImportTemplate"]').click();
        });
    }

    cancelImport() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test="cancelImport"]').click();
        });
    }
}
