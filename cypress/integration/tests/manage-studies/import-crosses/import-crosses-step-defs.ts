import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import CreateStudyPage from '../../../pageobjects/studies/create-study-page';
import ImportCrossesPage from '../../../pageobjects/studies/import-crosses-page';
import SaveListTreeModalPage from '../../../pageobjects/studies/save-list-tree-modal-page';

const createStudyPage = new CreateStudyPage();
const importCrossesPage = new ImportCrossesPage();
const saveListTreeModalPage = new SaveListTreeModalPage();

let listName = '';

When('I export a crossing template', () => {
    let studyName = Cypress.env('rcbdStudy');
    createStudyPage.clickStudyAction('Export crossing template', 'Crossing options');
    cy.verifyDownload(`CrossingTemplate-${studyName}.xls`);
});

And('I import a crossing template with details', () => {
    let studyName = Cypress.env('rcbdStudy');
    importCrossesPage.uploadFile(`CrossingTemplate-${studyName}.xls`);
    importCrossesPage.specifyBreedingMethod();
    importCrossesPage.goToNamingAndHarvestDetails();
});

And('I select automatic naming generation', () => {
    importCrossesPage.specifyAutomaticNaming();
    importCrossesPage.specifyHarvestDetails();
    importCrossesPage.goToPreviewCrosses();
    importCrossesPage.goToSaveList();
});

And('I specified naming format', () => {
    importCrossesPage.specifyManualNamingDetails();
    importCrossesPage.specifyHarvestDetails();
    importCrossesPage.goToPreviewCrosses();
    importCrossesPage.goToSaveList();
});

And('And I save the cross list', () => {
    listName = 'Cross-' + Date.now();
    saveListTreeModalPage.setListName(listName);
    saveListTreeModalPage.save();
});

Then('a message saying that list data is saved successfully should display', () => {
    saveListTreeModalPage.verifySuccessSaveList();
});




