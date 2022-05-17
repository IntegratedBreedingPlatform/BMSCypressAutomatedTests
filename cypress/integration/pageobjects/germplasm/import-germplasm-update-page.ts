import { getIframeBody } from '../../../support/commands';

export default class ImportGermplasmUpdatesPage{
    interceptSaveRequest() {
        cy.intercept('PATCH', `bmsapi/crops/${Cypress.env('cropName')}/germplasm?programUUID=*`).as('importGermplasmUpdates');
    }

    verifySuccessfulImport() {
        cy.wait('@importGermplasmUpdates').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains('Germplasm updates are saved successfully');
        })
    }

    downloadImportFile() {
        getIframeBody().find('[data-test="downloadTemplateLink"]').click(); 
    }
 
    async uploadGermplasmUpdateFile(fileName: string) {
        const downloadsFolder = Cypress.config('downloadsFolder');
        const downloadedFilename = `${downloadsFolder}/${fileName}`;
        const gid = Cypress.env('importedGid');

        cy.task('generateImportGermplasmUpdates', downloadedFilename + '#' + gid).then(() => {
            // Wait for the modified file to be written
            cy.wait(5000);

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

            // Click continue
            getIframeBody().find('[data-test="importGermplasmUpdateButton"]').should('be.visible').click();

        });
    

    }
}