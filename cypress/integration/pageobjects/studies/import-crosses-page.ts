import { getIframeBody } from "../../../support/commands";

export default class ImportCrossesPage {

    async uploadFile(fileName: string) {

        getIframeBody().find('#fbk-import-study-data-modal').should('be.visible');

        const downloadsFolder = Cypress.config('downloadsFolder');
        const downloadedFilename = `${downloadsFolder}/${fileName}`;

        cy.task('generateImportCrossesTestData', downloadedFilename).then(() => {

            // Upload the modified downloaded file 
            cy.readFile(downloadedFilename, 'binary', { timeout: 15000 }).then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) => {
                getIframeBody().find('#fileupload-import-crosses').attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    encoding:'utf8',
                    lastModified: new Date().getTime()
                });
            });

            // Wait for file to be uploaded
            cy.wait(50);

            // Click continue
            getIframeBody().find('[data-test="importCrossesUploadContinue"]').should('be.visible').click();

        });
    

    }

    specifyBreedingMethod() {
        getIframeBody().find('#selectMethodInImportFile').should('be.visible').click();
        getIframeBody().find('[data-test="importCrossesSpecifyBreedingMethodContinue"]').should('be.visible').click();
    }

    specifyNaming() {
        getIframeBody().find('[data-test="automaticNameGenerationOption"]').should('be.visible').click();
    }

    specifyHarvestDetails() {
        getIframeBody().find('[data-test="importCrossesNamingContinue"]').should('be.visible').click();
    }

}