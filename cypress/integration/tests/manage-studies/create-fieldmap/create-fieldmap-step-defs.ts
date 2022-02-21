import { And } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../../../support/commands';
import CreateFieldmapPage from '../../../pageobjects/studies/create-fieldmap-page';
import CreateStudyPage from '../../../pageobjects/studies/create-study-page';

const createStudyPage = new CreateStudyPage();
const createFieldmapPage = new CreateFieldmapPage();


And('I click OK to navigate to fieldmap page', () => {
    createStudyPage.selectFielmapLocations();
    createFieldmapPage.waitForFieldmapPageToLoad();
});

And('I add field and block', () => {
    const fieldName = `Field-${randomString()}`;
    const blockName = `Block-${randomString()}`;
    createFieldmapPage.addFieldName(fieldName);
    createFieldmapPage.addBlockName(blockName);
});

And('I specify valid row, range and plot details', () => {
    createFieldmapPage.specifyNumberOfRowsAndRanges();
});

And('I navigate to planting details page', () => {
    createFieldmapPage.moveToPlantingDetailsPage();
    createFieldmapPage.waitForFieldmapPageToLoad();
});

And('I select row column layout order', () => {
    createFieldmapPage.specifyPlotLayoutOrder('1');
});

And('I navigate to generate fieldmap page', () => {
    createFieldmapPage.moveToGenerateFieldmapPage();
    createFieldmapPage.waitForFieldmapPageToLoad();
});

And('I click Finish', () => {
    createFieldmapPage.clickFinish();
});

And('Fieldmap range and fieldmap column are added in observation table', () => {
    createStudyPage.verifyColumnsInObservationTable(['FIELDMAP RANGE','FIELDMAP COLUMN']);
}); 












