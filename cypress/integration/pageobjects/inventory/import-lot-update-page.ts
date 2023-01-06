import { getIframeBody } from '../../../support/commands';

export default class ImportLotUpdatePage{

    interceptSaveRequest() {
        cy.intercept('PATCH', `bmsapi/crops/${Cypress.env('cropName')}/lot-lists?programUUID=*`).as('importLots');
    }

    verifySuccessfulImport() {
        cy.wait('@importLots').then((interception) => {
            expect(interception.response?.statusCode).to.equal(204);
            getIframeBody().find('ngb-alert > span').contains('The lots has been updated successfully.');
            getIframeBody().find('[data-test="unitNameData"]').contains('SEED_AMOUNT_t');
            getIframeBody().find('[data-test="notesData"]').contains('updated unit and notes');
        })
    }

    downloadImportFile() {
        getIframeBody().find('[data-test="downloadTemplateLink"]').click(); 
    }

    async uploadFile(fileName: string, newLotUID: string, taskName: string) {
        const downloadsFolder = Cypress.config('downloadsFolder');
        const downloadedFilename = `${downloadsFolder}/${fileName}`;
        const gid = Cypress.env('importedGid');
         // HACK: Concatenate fileName and lotuid parameters, separated by "#" delimiter
        cy.task('generateImportLotUpdateData', downloadedFilename + '#' + newLotUID).then(() => {
            // Wait for the modified file to be written
            cy.wait(2000);

            // Upload the modified downloaded file 
            cy.readFile(downloadedFilename, 'binary', { timeout: 15000 }).then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) => {
                getIframeBody().find('#importFile').attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    encoding:'utf8',
                    lastModified: new Date().getTime()
                });
            });

             // Wait for file to be uploaded
             cy.wait(100);

            getIframeBody().find('[data-test="importLotUpdateSubmitButton"]').should('exist').click().then(() => {
                this.fillUpMapping();
            });
        });
    }

    fillUpMapping() {
        getIframeBody().find('[data-test="importLotUpdateMappingModal"]').should('exist');
        getIframeBody().find('#unitLabel').check();
        getIframeBody().find('#notesLabel').check();
        getIframeBody().find('[data-test="proceedToImportButton"]').should('exist').click();
    }
}
