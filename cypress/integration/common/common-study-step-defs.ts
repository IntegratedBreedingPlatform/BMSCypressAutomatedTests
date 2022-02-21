import { When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { randomString } from '../../support/commands';
import CreateStudyPage from '../pageobjects/studies/create-study-page';
import ManageStudiesPage from '../pageobjects/studies/manage-studies-page'
import ManageObservationsPage from '../pageobjects/studies/manage-observations-page'

const manageStudiesPage = new ManageStudiesPage();
const createStudyPage = new CreateStudyPage();
const manageObservationsPage = new ManageObservationsPage();

And('I opened a study with RCBD design', () => {
    // Reuse created RCBD study within session
    if (Cypress.env('rcbdStudy')) {
        manageStudiesPage.browseExistingStudies();
        manageStudiesPage.selectExistingStudy(Cypress.env('rcbdStudy'));
        createStudyPage.waitForStudyToLoad();

    // Otherwise, create new RCBD study
    } else {
        cy.wrap('Study-' + Math.random().toString(20).replace(/[^a-z]+/g, '')).as('rcbdStudy').then((rcbdStudy) => {
            Cypress.env('rcbdStudy', rcbdStudy);
            manageStudiesPage.startNewStudy();
            createStudyPage.saveNewStudyWithRCBDDesign(rcbdStudy,
                'Study with Randomized Complete Block Design',
                'Trial', 'This is an autogenerated study from Cypress e2e testing.');
        });
    }
});

When('I click {} action from {}', (actionName, actionOptionsName) => {
    createStudyPage.clickStudyAction(actionName, actionOptionsName);
});

And('I add {} trait to the study', (traitName) => {
    createStudyPage.addTrait(traitName);
})

And('I add {} trait to the study with observations', (traitName) => {
    createStudyPage.addTrait(traitName);
    manageObservationsPage.addTraitObservations(traitName);
})

Then('I should be directed back to the study', () => {
    createStudyPage.waitForStudyToLoad();
});

