  
import { Given,When,And,Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../../../pageobjects/LoginPage'

const loginPage = new LoginPage()

Given('I go to BMS login page',()=>{
    loginPage.launchLogin()
})
When('I enter valid user credentials',()=>{
    loginPage.enterUsername()
    loginPage.enterPassword()
})
And('I click login',()=>{
    loginPage.clickLogin()
})
Then('Dashboard page will display',()=>{

    loginPage.checkURLandToken()
    loginPage.checkIfCookieExist('BMS_TOK')
   
    
})
