import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import LoginPage from '../pageobjects/LoginPage'
import DashboardPage from '../pageobjects/DashboardPage'
import SidebarSection from '../pageobjects/SidebarSection'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const sidebarSection = new SidebarSection()

// ==================================
// GIVENS
Given('I am already logged in to BMS', () => {
    loginPage.performLogin();
});

// ==================================
// WHENS
When('I launch a program', () => {
    dashboardPage.launchProgram();
});

When('I navigate to {} in the sidebar', (sidebarLink) => {
    sidebarSection.navigateTo(sidebarLink);
});


// ==================================
// THENS
Then('The {} page should display', (page) => {
    if (page === 'BMS login') {
        loginPage.verifyPageLoaded();

    } else if (page === 'Dashboard') {
        loginPage.checkURLandToken()
        loginPage.checkIfCookieExist('BMS_TOK')
        dashboardPage.verifyPageLoaded();

    } else if (page === 'Add Program') {

    } else if (page === 'Site Admin') {

    } else {
        sidebarSection.verifyPageIsShown(page);
        // TODO add page-specific checking of elements
    }
});






