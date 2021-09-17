  
import { Given,When,And,Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../../../pageobjects/LoginPage'

const loginPage = new LoginPage()

Given('I navigate to the BMS login page',()=>{
    loginPage.launchLogin()
})

When('I enter valid user credentials',()=>{
   loginPage.enterValidCredentials();
})
And('I click login',()=>{
    loginPage.clickLogin()
})
Then('The BMS login should have the correct version',()=>{
    loginPage.checkBMSVersion()
})

