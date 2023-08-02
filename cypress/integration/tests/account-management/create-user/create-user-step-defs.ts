import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import UsersPage from '../../../pageobjects/account-management/users-page';
import { randomString } from '../../../../support/commands';
import { SidebarTool } from '../../../pageobjects/sidebar-section';

const usersPage = new UsersPage();

When('I create a new user with valid details',()=>{
    usersPage.openAddUserModal();
    usersPage.createUser();
});

And('I assign an the created program role to the user',()=>{
    usersPage.assignRoleToUser();
});

And('I add the new user',()=>{
    usersPage.saveNewUser();
});

Then('I should see that the created user in the list',()=>{
    usersPage.checkNewUserExists();
    usersPage.checkAddUserSuccess();
    
});




