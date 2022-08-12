import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import CreateNameTypePage from '../../../pageobjects/crop-management/create-name-type-page';

const createNameTypePage = new CreateNameTypePage();

When('I navigate  Germplasm Name Types tab', () => {
    createNameTypePage.clickNameTypeTab();
});

And('I create a new name type', () => {
    createNameTypePage.openCreateNameTypeModal();
    createNameTypePage.enterNameTypeDetails();
});

Then('A message displays saying name type was created successfully', () => {
    createNameTypePage.verifyCreateNameTypeSuccessfully();
});
