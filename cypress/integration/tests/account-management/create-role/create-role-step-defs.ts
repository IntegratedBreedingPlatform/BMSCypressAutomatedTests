import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import RolesPage from '../../../pageobjects/account-management/roles-page';
import { randomString } from '../../../../support/commands';
import { SidebarTool } from '../../../pageobjects/sidebar-section';

const rolesPage = new RolesPage();


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




