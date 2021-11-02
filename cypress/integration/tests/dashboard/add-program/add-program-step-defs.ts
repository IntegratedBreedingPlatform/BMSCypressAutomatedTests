import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import DashboardPage from '../../../pageobjects/dashboard-page';
import AddProgramPage from '../../../pageobjects/add-program-page';
import { randomString } from '../../../../support/commands';

const dashboardPage = new DashboardPage();
const addProgramPage = new AddProgramPage();

const cropName = Cypress.env('cropName');

const id = randomString(5);
const programName = `PROG${id}`;

When('I navigate to Add Program page',()=>{
    dashboardPage.clickAddProgram();
})

And('I select a crop name',()=>{
    addProgramPage.openCropNameOptions();
    addProgramPage.selectCropName(cropName);
})

And('I enter a program name',()=>{
    addProgramPage.enterProgramName(programName);
})

And('I save program details',()=>{
    addProgramPage.clickSaveProgram();
})

Then('A success message should display',()=>{
    addProgramPage.checkSaveProgramSuccess();
})




