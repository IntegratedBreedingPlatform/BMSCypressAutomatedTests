import { getIframeBody } from '../../../support/commands';

export default class ImportGermplasmPage{

    importFile(fileName:string, listName:string, importInventory:boolean){
        this.uploadFile(fileName);
        this.goToInventoryScreen();
        if (importInventory) {
            this.saveInventory();
        }
        this.goToReviewScreen();
        this.saveImport();
        if (importInventory) {
            this.verifyLotsSaved();
        }
        this.clickSaveList(listName);
    }

    uploadFile(fileName: string) {
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) => {
                getMainIframeDocument().find('#importFile').attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    encoding:'utf8',
                    lastModified: new Date().getTime()
                })
            })

        cy.wait(50);

        // Click next button to go to basic details modal
        getMainIframeDocument().find('jhi-germplasm-import > .modal-footer > .btn-primary').click().then(() => {
            getMainIframeDocument().find('jhi-germplasm-import-basic-details').should('exist');
        });

    }

    goToInventoryScreen() {
        // Click next button to go inventory modal
        getMainIframeDocument().find('jhi-germplasm-import-basic-details > .modal-footer > .btn-primary').click().then(() => {
            getMainIframeDocument().find('jhi-germplasm-import-inventory').should('exist');
        });
    }
    
    saveInventory() {
        const location = 'Default Seed Store - (DSS)';
        getIframeBody().find('#createInventoryLots').click();
        getIframeBody().find('#stockIdPrefixInput').type("STK");
        getIframeBody().find('#useFavoriteSeeStorageLocations').click();
        getIframeBody().find('#seedStorageLocation').should('exist').click()
        getIframeBody().find('input[role="searchbox"]').should('be.visible').type(location+'{enter}').then(()=>{
            getIframeBody().find('#seedStorageLocation .select2-selection__rendered').should('have.text',location);
        });
        getIframeBody().find('#dropdownUnits').should('exist').select("SEED_AMOUNT_g", { force : true });    
        getIframeBody().find('#depositAmount').type("100");
        getIframeBody().find('#confirmDeposit').click();
    }
    
    goToReviewScreen() {
        // Click next button to go to import review modal
       getMainIframeDocument().find('jhi-germplasm-import-inventory > .modal-footer > .btn-primary').click().then(() => {
           getMainIframeDocument().find('jhi-germplasm-import-review').should('exist');
       });
    }

    saveImport() {
        // Click save button
        getMainIframeDocument().find('jhi-germplasm-import-review > .modal-footer > .btn-primary').click().then(() => {
            getMainIframeDocument().find('jhi-modal-confirm').should('exist');
        });
        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/germplasm?programUUID=*`).as('importGermplasm');
        // Click confirm button of confirmation modal
        getMainIframeDocument().find('.container > .modal-footer > .btn-primary').click().then(() => {
            getMainIframeDocument().find('jhi-germplasm-list-creation').should('exist');
        })
    }

    verifyImportSaved() {
        cy.wait('@importGermplasm').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getMainIframeDocument().find('ngb-alert > span').contains('Germplasm imported successfully!');
            getMainIframeDocument().find('jhi-germplasm-list-creation > div.modal-footer > button.btn-secondary').should('exist').click();
            getMainIframeDocument().find('table > tbody > tr:nth-child(1) > td:nth-child(2) > a').should('exist')
            getMainIframeDocument().find('jhi-item-count-custom > span').should('exist').contains('Showing 1 - 1 of ');
            getMainIframeDocument().find('jhi-item-count-custom > span > span.font-weight-bold').should('exist').contains('1');
        });
    }

    skipSavingList() {
        cy.wait('@importGermplasm').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            cy.intercept('GET', `bmsapi/crops/${Cypress.env('cropName')}/germplasm/search?programUUID=*`).as('loadGermplasms');
            getIframeBody().find('[data-test="cancelSaveList"]').click();
        }
    }

    clickSaveList(listName: string) {
        getIframeBody().then(($iframe) => {
            // Select "Program list" node
            cy.wrap($iframe).find('p-tree > div > ul > p-treenode:nth-child(2) > li.ui-treenode > div').should('exist').click();
            cy.wrap($iframe).find('[data-test="name"]').type(listName);
            cy.wrap($iframe).find('[data-test="saveList"]').click();
        });
    }

    verifyLotsSaved(){
        getIframeBody().find('ngb-alert > span').contains(' lots were created successfully');
    }
}
const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}
