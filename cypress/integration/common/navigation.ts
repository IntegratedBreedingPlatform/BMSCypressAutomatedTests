import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import LoginPage from '../pageobjects/account-management/login-page'
import DashboardPage from '../pageobjects/dashboard-page'
import SidebarSection, { SidebarTool } from '../pageobjects/sidebar-section'
import NavbarSection from '../pageobjects/navbar-section';

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const sidebarSection = new SidebarSection()
const navBar = new NavbarSection()

// ==================================
// GIVENS
Given('I am already logged in to BMS', () => {
    loginPage.performLogin();
});

Given('I am on the {} page', (page) => {
    loginPage.performLogin();
    dashboardPage.launchProgram();
    let tool = SidebarTool.getFromToolName(page);
    sidebarSection.navigate(tool);
});

Given('I am on the {} page of specified program', (page) => {
    loginPage.performLogin();
    dashboardPage.launchProgram(true);
    let tool = SidebarTool.getFromToolName(page);
    sidebarSection.navigate(tool);
});

Given('I reload the {} page', (page) => {
    let tool = SidebarTool.getFromToolName(page);
    sidebarSection.reload(tool);
});

And('I navigate to Site Admin page',()=>{
    navBar.clickSiteAdmin();
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






