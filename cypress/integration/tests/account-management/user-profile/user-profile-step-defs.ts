import { After, And, Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import UserProfilePage from '../../../pageobjects/account-management/user-profile-page';
import NavbarSection from '../../../pageobjects/navbar-section';

const navBar = new NavbarSection();
const userProfilePage = new UserProfilePage();



Given('I navigate to update user profile screen',()=>{
    navBar.openUserProfilePopup();
})

When('I update my existing details',()=>{
    userProfilePage.updateDetails();
})

And('I enter valid password',()=>{
    userProfilePage.enterPassword();
})

And('I click Update',()=>{
    userProfilePage.clickUpdate();
})


Then('The update of user profile should succeed',()=>{
    userProfilePage.verifySuccessfulUpdate();
})
