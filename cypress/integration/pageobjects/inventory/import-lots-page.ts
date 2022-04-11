import { getIframeBody } from '../../../support/commands';

export default class ImportLotsPage{

    interceptSaveRequest() {
        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/lot-lists?programUUID=*`).as('importLots');
    }

    verifySuccessfulImport() {
        cy.wait('@importLots').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('The lots has been imported successfully');
        })
    }

    downloadImportFile() {
        getIframeBody().find('[data-test="downloadTemplateLink"]').click(); 
    }

    async uploadFile(fileName: string) {
        const downloadsFolder = Cypress.config('downloadsFolder');
        const downloadedFilename = `${downloadsFolder}/${fileName}`;
        const gid = Cypress.env('importedGid');
         // HACK: Concatenate fileName and gid parameters, separated by "#" delimiter
        cy.task('generateImportLotsData', downloadedFilename + '#' + gid).then(() => {
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

            getIframeBody().find('[data-test="importLotsButton"]').should('exist').click();
        });
    }

}
