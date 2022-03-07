import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import AddProgramPage from '../../../pageobjects/add-program-page';
import { randomString } from '../../../../support/commands';
import NavbarSection from '../../../pageobjects/navbar-section';

const navBar = new NavbarSection();
const addProgramPage = new AddProgramPage();

const cropName = Cypress.env('cropName');

const id = randomString(5);
const programName = `PROG${id}`;

When('I navigate to Add Program page',()=>{
    navBar.clickAddProgram();
})

And('I select a crop name',()=>{
    addProgramPage.openCropNameOptions();
    addProgramPage.selectCropName(cropName);
})

And('I enter a program name',()=>{
    addProgramPage.enterProgramName(programName);
})

And('I enter a program start date',()=>{
    addProgramPage.enterProgramStartDate("2022-03-07");
})

And('I save program details',()=>{
    addProgramPage.clickSaveProgram();
})

Then('A success message should display',()=>{
    addProgramPage.checkSaveProgramSuccess();
})




