  
import { Given,When,And,Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../../../pageobjects/account-management/login-page'
import DashboardPage from '../../../pageobjects/dashboard-page';

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage();

Given('I navigate to the BMS login page',()=>{
    loginPage.launchLogin();
})

When('I enter valid user credentials',()=>{
   loginPage.enterValidCredentials();
})

And('I click login',()=>{
    loginPage.clickLogin();
})

When('I sign out',()=>{
    dashboardPage.signOut();
})

Then('The BMS login should have the correct version',()=>{
    loginPage.checkBMSVersion();
})


Then('I should be redirected to the login page',()=>{
    loginPage.verifyPageLoaded();
})

