import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import DashboardPage from '../../../pageobjects/dashboard-page';
import AddProgram from '../../../pageobjects/add-program-page';

const dashboardPage = new DashboardPage();
const addProgram = new AddProgram();

const cropName = Cypress.env('cropName');

const randomizeId = () => Math.random().toString(36).substring(2, 7);
const id = randomizeId();
const programName = `PROG${id}`;

When('I click Add a Program',()=>{
    dashboardPage.clickAddProgram();
})

And('I select a Crop Name',()=>{
    addProgram.openCropNameOptions();
    addProgram.selectCropName(cropName);
})

And('I enter a Program Name',()=>{
    addProgram.enterProgramName(programName);
})

And('I click Save on Add a Program screen',()=>{
    addProgram.clickSaveProgram();
})

Then('adding of a program succeeds',()=>{
    addProgram.checkSaveProgramSuccess();
})




