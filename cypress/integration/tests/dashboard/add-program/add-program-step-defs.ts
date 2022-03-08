import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import AddProgramPage from '../../../pageobjects/add-program-page';
import { randomString } from '../../../../support/commands';
import NavbarSection from '../../../pageobjects/navbar-section';
import { DatePipe } from '@angular/common';

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
    const datePipe = new DatePipe('en-US');
    addProgramPage.enterProgramStartDate(datePipe.transform(Date.now(), 'YYYY-MM-dd'));
})

And('I save program details',()=>{
    addProgramPage.clickSaveProgram();
})

Then('A success message should display',()=>{
    addProgramPage.checkSaveProgramSuccess();
})




