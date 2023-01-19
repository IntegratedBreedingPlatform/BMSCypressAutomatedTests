import { getIframeBody } from '../../../support/commands';

export default class GraphicalQueryPage {

    selectStudyName (studyName: string) {
        getMainIframeDocumentWaitToLoad().xpath(`//div[@id='trials']//input`).should('be.visible').type(studyName, { force: true, delay: 0 });
        getIframeBody().xpath(`//span[contains(@class,'select2-results')]//ul[@class='select2-results__options']/li[text()='${studyName}']`).should('be.visible').click();
    }

    addStudyName (studyName: string) {
        getIframeBody().xpath(`//div[@id='trials']//input`).should('be.visible').type(studyName, { force: true, delay: 0 });
        getIframeBody().xpath(`//span[contains(@class,'select2-results')]//ul[@class='select2-results__options']/li[text()='${studyName}']`).should('be.visible').click();
    }

    selectObservationLevel () {
        getIframeBody().find('[data-test="observationLevelSelect"]').should('exist').select('PLOT');
    }

    selectStudyComparisonQueryType () {
        getIframeBody().find('[data-test="queryTypeSelect"]').should('exist').select('Study Comparison');
    }

    selectVariableToCompare(variableName: string) {
        getIframeBody().find('#scomp-select-var').should('exist').select(variableName);
    }

    clickCompareVariable() {
        getIframeBody().find('#scomp-compare').click();
    }

    verifyDisplayedGraph() {
        getIframeBody().find('#graph_div').children().should('have.length', 1);
    }

    clickLoadQuery () {
        getIframeBody().find('#load-brapi').should('exist').click();
    }

    addRangeOfValues (traitName: string) {
        getIframeBody().find('button[data-test="addFilterButton"]').should('exist').click();
        getIframeBody().find('a[data-test="newRangeOption"]').should('exist').click();
        getIframeBody().find('select[data-test="selectTrait"]').should('exist').select(traitName);
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
