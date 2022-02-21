import { getIframeBody } from '../../../support/commands';

export default class PlotVisualizationPage {

    openPlotVisualizationModal () {
        getIframeBody().find('[data-test="plotVisualizationButton"]').should('exist').click();
    }

    selectPlotType () {
        getIframeBody().find('[data-test="plotTypeSelect"]').should('exist').click();
        getIframeBody().find('[data-test="Scatterplot_option"]').should('exist').click();
    }

    selectRegressionMethod () {
        getIframeBody().find('[data-test="regressionMethodSelect"]').should('exist').click();
        getIframeBody().find('[data-test="auto_option"]').should('exist').click();
    }

    selectXYVariable () {
        getIframeBody().find('[data-test="xVariableSelect"]').should('exist').click();
        getIframeBody().find('[data-test="Aflatox_M_ppb_option"]').should('exist').click();
        getIframeBody().find('[data-test="yVariableSelect"]').should('exist').click();
        getIframeBody().find('[data-test="ASI_Cmp_day_option"]').should('exist').click();
    }

    generatePlotVisualization () {
        cy.intercept('POST', `**/observationUnits/mapList*`).as('generatePlot');
        getIframeBody().find('button[data-test="generateVisualizationButton"]').should('exist').click();
    }

    verifyGenerateSuccess () {
        cy.wait('@generatePlot').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('img[data-test="visualizationImage"]').should('be.visible');
        })
    }
}

