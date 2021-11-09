  
import { Given,When,And,Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../../../pageobjects/login-page'
import ResetPasswordPage from '../../../pageobjects/account-management/reset-password-page';

const loginPage = new LoginPage();
const resetPasswordPage = new ResetPasswordPage();

Given('I navigate to the Reset Password page',()=>{
    loginPage.launchLogin();
    loginPage.goToResetPasswordPage();
})

When('I enter my email addresss and username',()=>{
   resetPasswordPage.enterValidCredentials();
})

And('I click Continue',()=>{
    resetPasswordPage.clickContinue();
})

Then('A message saying that a link was sent to my email should display',()=>{
    resetPasswordPage.verifySendResetEmail();
})
