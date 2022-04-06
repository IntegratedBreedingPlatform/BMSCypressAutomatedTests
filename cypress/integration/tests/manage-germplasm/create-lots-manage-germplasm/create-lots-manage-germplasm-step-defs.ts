import { And, Then, When } from "cypress-cucumber-preprocessor/steps";
import { randomString } from "../../../../../cypress/support/commands";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page';
import CreateLotsPage from '../../../pageobjects/inventory/create-lots-page';

const manageGermplasmPage = new ManageGermplasmPage();
const createLotsPage = new CreateLotsPage();


When('I select some germplasm entries', () => {
    manageGermplasmPage.selectRandomGermplasm();
});

And('I navigate to create lot screen', () => {
    manageGermplasmPage.clickCreateInventoryLotsAction();
});

And('I specified valid values for lot details', () => {
    createLotsPage.specifyLotDetails("STK", "SEED_AMOUNT_g", "Sample Lot Notes " + randomString());
});

And('I enable initial deposit', () => {
    createLotsPage.enableInitialDeposit();
});

And('I specify valid deposit details', () => {
    createLotsPage.specifyDepositDetails("100", "Sample Deposit Notes " + randomString());
});

And('I confirm transactions on saving', () => {
    createLotsPage.confirmTransactionsOnSaving();
});

And('I save the new lot', () => {
    createLotsPage.interceptSaveRequest();
    createLotsPage.clickSaveButton();
});

Then('I should be able to see that the new lot has been created successfully', () => {
    createLotsPage.verifySuccessfulCreation();
});
