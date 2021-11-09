import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import AddProgramPage from '../../../pageobjects/add-program-page';
import NavbarSection from '../../../pageobjects/navbar-section';

const navBar = new NavbarSection();
const addProgramPage = new AddProgramPage();

const cropName = Cypress.env('cropName');

const randomizeId = () => Math.random().toString(36).substring(2, 7);
const id = randomizeId();
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

And('I save program details',()=>{
    addProgramPage.clickSaveProgram();
})

Then('A success message should display',()=>{
    addProgramPage.checkSaveProgramSuccess();
})




