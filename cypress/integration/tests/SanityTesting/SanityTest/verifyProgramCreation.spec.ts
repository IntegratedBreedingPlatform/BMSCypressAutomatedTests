import { Given,When, Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../../../pageobjects/LoginPage'
import Dashboard from '../../../pageobjects/Dashboard'
import AddProgram from '../../../pageobjects/AddProgram'

const loginPage = new LoginPage()
const dashboardPage = new Dashboard()
const addProgramPage = new AddProgram()

Given('I navigate to BMS login screen', () => {
    loginPage.launchLogin()         
});

When('I login as an admin', () => {
  
  loginPage.enterUsername()
  loginPage.enterPassword()   
  loginPage.clickLogin()    
  loginPage.checkURLandToken()
  loginPage.checkIfCookieExist('BMS_TOK')        
});

When('I navigate to Add a Program page', () => {
  dashboardPage.clickAddProgram()     
});

When('I select a {string} name', (cropName) => {
  addProgramPage.enterCropName(cropName)
});

When('I enter a {string} name', (programName) => {
  addProgramPage.enterProgramName(programName)       
});

When('I clicked Save', () => {
  addProgramPage.clickSaveProgram()        
});

Then('A success message saying the program has been sucessfully created displays', () => {
   addProgramPage.checkSaveProgramSuccess()       
});