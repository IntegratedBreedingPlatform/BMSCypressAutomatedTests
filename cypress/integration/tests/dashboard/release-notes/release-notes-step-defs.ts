import { Given,When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ReleaseNotesPage from '../../../pageobjects/release-notes-page'
import LoginPage from '../../../pageobjects/account-management/login-page'

const loginPage = new LoginPage()
const releaseNotesPage = new ReleaseNotesPage();

And('I reset release_note_user show_again value to 1', ()=> {
    releaseNotesPage.resetReleaseNoteUserShowAgainValueTo1();
})

Then('Release Notes pop-up displays', ()=> {
    releaseNotesPage.verifyReleaseNotesDisplayed();
})

And('I am presented with the release notes pop-up', ()=> {
    releaseNotesPage.verifyReleaseNotesDisplayed();
})

When('I uncheck the Don\'t show again checkbox', ()=> {
    releaseNotesPage.setDontShowAgainValue(false);
})

When('I check the Don\'t show again checkbox', ()=> {
    releaseNotesPage.setDontShowAgainValue(true);
})

And('I click OK', ()=> {
    releaseNotesPage.clickOk();
})

And('I re-log in the system', ()=> {
    loginPage.performLogin();
})

Then('I should see the release notes pop-up again', ()=> {
    releaseNotesPage.verifyReleaseNotesDisplayed();
})

Then('I should no longer see the release notes pop-up', ()=> {
    releaseNotesPage.verifyReleaseNotesNotDisplayed();
})