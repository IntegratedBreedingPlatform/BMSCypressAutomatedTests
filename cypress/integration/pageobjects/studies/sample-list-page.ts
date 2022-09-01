import { getIframeBody, randomString } from '../../../support/commands';

export default class SampleListPage {
    clickSaveList(listName: string) {
        getIframeBody().find('[data-test="createSampleModal"]').should('exist');
        getIframeBody().find('#sampleListName').should('exist').type(listName).then(() => {
            getIframeBody().find('#sampleFolderTree > ul.fbtree-container > li.dynatree-lastsib > span > a.dynatree-title').should('exist')
                .click({force:true});
            getIframeBody().find('#submitSampleList').click();
        });
    }

    createGenotypeSamples(variableName: string, listName: string) {
        getIframeBody().find('[data-test="datasetOptionContinueButton"]').should('exist').click();
        getIframeBody().find('[data-test="selectEnvContinueButton"]').should('exist').click();
        this.inputSampleListDetails(variableName);
        getIframeBody().find('[data-test="selectVariateSaveButton"]').should('exist').click();
        this.clickSaveList(listName);
    }

    inputSampleListDetails(variableName: string) {
        getIframeBody().find('#s2id_sampleSelectVariable').should('exist').click();
        getIframeBody().find('div.select2-result-label').contains(variableName).should('exist').click();
    }

    browseAndSelectList(listName: string) {
        cy.intercept('GET', `**/sample-lists/tree?*parentFolderId=LISTS*`).as('loadSampleLists');
        getIframeBody().find('[data-test="browseSampleListButton"]').should('exist').click();

        cy.wait('@loadSampleLists').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('[data-test="sampleListName"]').contains(listName).should('exist').click();
            getIframeBody().find('[data-test="openSampleListOkButton"]').should('exist').click();
        });
    }

    verifyListDetails(listName: string) {
        getIframeBody().find('[data-test="sampleListTab"]').contains(listName).should('exist');
    }
}

