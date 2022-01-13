import { getIframeBody } from '../../../support/commands';

export default class GraphicalQueryPage {

    selectStudyName (studyName: string) {
        getMainIframeDocumentWaitToLoad().xpath(`//div[@id='trials']//input`).should('be.visible').type(studyName, { force: true, delay: 0 });
        getIframeBody().xpath(`//span[contains(@class,'select2-results')]//ul[@class='select2-results__options']/li[text()='${studyName}']`).should('be.visible').click();
    }

    selectObservationLevel () {
        getIframeBody().find('[data-test="observationLevelSelect"]').should('exist').select('PLOT');
    }

    clickLoadQuery () {
        getIframeBody().find('#load-brapi').should('exist').click();
    }

    addRangeOfValues () {
        getIframeBody().find('button[data-test="addFilterButton"]').should('exist').click();
        getIframeBody().find('a[data-test="newRangeOption"]').should('exist').click();
        getIframeBody().find('select[data-test="selectTrait"]').should('exist').select('AleuCol_E_1to5');
    }

    exportByOverallAverage () {
        getIframeBody().find('button[data-test="exportDataButton"]').should('exist').click();
        getIframeBody().find('select[data-test="exportTransformationSelect"]').should('exist').select('Overall average');
        cy.intercept('GET', `**/fileNameGenerator/generateFileName/csv?*`).as('exportCsv');
        getIframeBody().find('button[data-test="confirmExportButton"]').should('exist').click();
    }

    verifyExportSuccess () {
        cy.wait('@exportCsv').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        })
    }
}

const getMainIframeDocumentWaitToLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}
