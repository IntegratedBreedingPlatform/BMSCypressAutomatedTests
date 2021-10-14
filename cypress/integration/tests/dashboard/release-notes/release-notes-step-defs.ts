import { Given,When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ReleaseNotes from '../../../pageobjects/release-notes'
import LoginPage from '../../../pageobjects/login-page'

const loginPage = new LoginPage()
const releaseNotes = new ReleaseNotes();

Given('I am already logged in to BMS', ()=> {
    loginPage.performLogin();
})

Then('Release Notes pop-up displays', ()=> {
    releaseNotes.verifyReleaseNotesDisplayed();
})

And('I am presented with the release notes pop-up', ()=> {
    releaseNotes.verifyReleaseNotesDisplayed();
})

When('I uncheck the Don\'t show again checkbox', ()=> {
    releaseNotes.setDontShowAgainValue(false);
})

When('I check the Don\'t show again checkbox', ()=> {
    releaseNotes.setDontShowAgainValue(true);
})

And('I click OK', ()=> {
    releaseNotes.clickOk();
})

And('I re-log in the system', ()=> {
    loginPage.performLogin();
})

Then('I should see the release notes pop-up again', ()=> {
    releaseNotes.verifyReleaseNotesDisplayed();
})

Then('I should no longer see the release notes pop-up', ()=> {
    releaseNotes.verifyReleaseNotesNotDisplayed();
})