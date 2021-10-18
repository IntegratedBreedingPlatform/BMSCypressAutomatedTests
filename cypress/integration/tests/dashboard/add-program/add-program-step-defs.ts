import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import DashboardPage from '../../../pageobjects/dashboard-page';
import AddProgramPage from '../../../pageobjects/add-program-page';

const dashboardPage = new DashboardPage();
const addProgramPage = new AddProgramPage();

const cropName = Cypress.env('cropName');

const randomizeId = () => Math.random().toString(36).substring(2, 7);
const id = randomizeId();
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




