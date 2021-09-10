import { Given,Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../../../pageobjects/LoginPage'

const loginPage = new LoginPage()

Given('I navigate to BMS login screen', () => {
    loginPage.launchLogin()     
});

Then('The BMS login should have the correct tag version', () => {
    loginPage.checkLoginTagVersion() 
});