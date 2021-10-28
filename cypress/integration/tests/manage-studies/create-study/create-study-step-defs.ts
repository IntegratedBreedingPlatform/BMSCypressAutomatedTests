import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ManageStudiesPage from '../../../pageobjects/studies/manage-studies-page'
import CreateStudyPage from '../../../pageobjects/studies/create-study-page';

const manageStudiesPage = new ManageStudiesPage()
const createStudyPage = new CreateStudyPage()

const studyName = Cypress.env('existingStudyName');

And('I opened an existing study with germplasm list but with no existing design yet',()=>{
    manageStudiesPage.browseExistingStudies();
    manageStudiesPage.selectExistingStudy(studyName);
})

And('I generated experimental design using Randomized Complete Block design',()=>{
    createStudyPage.generateRCBDesign();
})

Then('Design generation should be successful',()=>{
    createStudyPage.checkGenerateDesignSuccess();
    createStudyPage.deleteGeneratedDesign();
})


