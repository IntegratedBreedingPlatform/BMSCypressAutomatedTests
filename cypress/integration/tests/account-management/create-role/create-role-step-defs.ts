import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import RolesPage from '../../../pageobjects/account-management/roles-page';
import NavbarSection from '../../../pageobjects/navbar-section';
import { randomString } from '../../../../support/commands';
import { SidebarTool } from '../../../pageobjects/sidebar-section';

const navBar = new NavbarSection();
const rolesPage = new RolesPage();


And('I navigate to Site Admin page',()=>{
    navBar.clickSiteAdmin();
});

When('I create a new {} role with valid details',(roleType)=>{
    rolesPage.selectRolesTab();
    rolesPage.openCreateRoleModal();
    rolesPage.createRole(roleType);
});

And('I select all available permissions',()=>{
    rolesPage.selectAllPermissions();
});

Then('A message should display that the {} role is successfully saved',(roleType)=>{
    rolesPage.checkAddRoleSuccess();
    rolesPage.checkNewRoleExists(roleType);
});




