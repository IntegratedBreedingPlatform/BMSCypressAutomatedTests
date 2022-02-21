import { When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import PlotVisualizationPage from '../../../pageobjects/studies/plot-visualization-page';

const plotVisualizationPage = new PlotVisualizationPage()

When('I navigate to plot visualization screen',  () => {
    plotVisualizationPage.openPlotVisualizationModal();
});

And('I select Scatterplot as plot type',  () => {
    plotVisualizationPage.selectPlotType();
});

And('I select Auto as regression method',  () => {
    plotVisualizationPage.selectRegressionMethod();
});

And('I select variable {} on X and {} on Y',  (x, y) => {
    plotVisualizationPage.selectXYVariable(x, y);
});

And('I generate plot visualization',  () => {
    plotVisualizationPage.generatePlotVisualization();
});

Then('a plot visualization graph should display',  () => {
    plotVisualizationPage.verifyGenerateSuccess();
});
