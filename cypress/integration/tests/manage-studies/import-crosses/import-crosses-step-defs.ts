import { When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import ManageStudiesPage from '../../../pageobjects/studies/manage-studies-page'
import CreateStudyPage from '../../../pageobjects/studies/create-study-page';
import ImportCrossesPage from '../../../pageobjects/studies/import-crosses-page';
import SaveListTreeModalPage from '../../../pageobjects/studies/save-list-tree-modal-page';

const manageStudiesPage = new ManageStudiesPage();
const createStudyPage = new CreateStudyPage();
const importCrossesPage = new ImportCrossesPage();
const saveListTreeModalPage = new SaveListTreeModalPage();

const studyName = 'Study-' + Math.random().toString(20).replace(/[^a-z]+/g, '');
const listName = 'Cross-' + Date.now();

When('I created a new study with basic details',  () => {
    manageStudiesPage.startNewStudy();
    createStudyPage.saveStudyWithBasicDetails(studyName,
        'Study with Randomized Complete Block Design',
        'Trial', 'This is an autogenerated study from Cypress e2e testing.');
});

And('I browsed germplasm list', () => {
    createStudyPage.addGermplasms();
});

And('I generated experimental design using Randomized Complete Block design', () => {
    createStudyPage.goToExperimentalDesign(false);
    createStudyPage.generateRCBDesign();
    createStudyPage.confirmGenerateModal();
});

And('Design generation is successful', () => {
    createStudyPage.checkGenerateDesignSuccess();
});

Then('I should be directed back to the study', () => {
    createStudyPage.waitForStudyToLoad();
});

When('I export a crossing template', () => {
    createStudyPage.clickStudyAction('Export crossing template', 'Crossing options');
    cy.verifyDownload(`CrossingTemplate-${studyName}.xls`);
});

And('I click {} action from {}', (actionName, actionOptionsName) => {
    createStudyPage.clickStudyAction(actionName, actionOptionsName);
});

And('I import a crossing template with details', () => {
    importCrossesPage.uploadFile(`CrossingTemplate-${studyName}.xls`);
    importCrossesPage.specifyBreedingMethod();
    importCrossesPage.goToNamingAndHarvestDetails();
});

And('I select automatic naming generation', () => {
    importCrossesPage.specifyNaming();
    importCrossesPage.specifyHarvestDetails();
    importCrossesPage.goToPreviewCrosses();
    importCrossesPage.goToSaveList();
});

And('And I save the cross list', () => {
    saveListTreeModalPage.setListName(listName);
    saveListTreeModalPage.save();
});

Then('a message saying that list data is saved successfully should display', () => {
    saveListTreeModalPage.verifySuccessSaveList();
});




