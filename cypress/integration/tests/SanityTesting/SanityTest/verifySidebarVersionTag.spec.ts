import { Given,When, Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../../../pageobjects/LoginPage'
import Dashboard from '../../../pageobjects/Dashboard'

const loginPage = new LoginPage()
const dashboardPage = new Dashboard()

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

When('I launch a program', () => {

  dashboardPage.selectCrop()
  dashboardPage.clickLaunchProgram()      
});

Then('The BMS sidebar should have the correct tag version', () => {
    dashboardPage.checkBMSVersion()    
});