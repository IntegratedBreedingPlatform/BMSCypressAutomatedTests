import { When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import GraphicalQueryPage from '../../../pageobjects/graphical-query/graphical-query-page';

const graphicalQueryPage = new GraphicalQueryPage()

When('I selected a study name with existing observation',  () => {
    let studyName = Cypress.env('rcbdStudy');
    graphicalQueryPage.selectStudyName(studyName);
});

And('I selected PLOT as observation level',  () => {
    graphicalQueryPage.selectObservationLevel();
});

And('I loaded the query by graphical filtering',  () => {
    graphicalQueryPage.clickLoadQuery();
});

And('I selected a range of values for trait in the Where section',  () => {
    graphicalQueryPage.addRangeOfValues('Aflatox_M_ppb');
});

And('I exported the data by overall average',  () => {
    graphicalQueryPage.exportByOverallAverage();
});

Then('The export file should be downloaded',  () => {
    graphicalQueryPage.verifyExportSuccess();
});
