import { And, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from '../../../pageobjects/germplasm-lists/germplasm-lists-page';
import GermplasmListAddEntryDetailsPage
    from '../../../pageobjects/germplasm-lists/germplasm-list-add-entry-details-page';

const searchPage = new GermplasmListsBetaPage();
const germplasmListPage = new GermplasmListPage();
const germplasmListAddEntryDetailsPage = new GermplasmListAddEntryDetailsPage();

When('I click on a Germplasm List name', () => {
    searchPage.openGermplasmList();
});
And('I click Add on Entry Details section', () => {
    germplasmListPage.openAddEntryDetailsModal();
});
And('I select a Variable', () => {
    germplasmListAddEntryDetailsPage.selectVariable();
});
And('Check that Entry Details section has the recently added Variable', () => {
    germplasmListPage.checkEntryDetailWasAdded(germplasmListAddEntryDetailsPage.variableName);
});
And('Germplasm List table has the recently added Variable', () => {
    germplasmListPage.checkGermplasmListTableHasColumn(germplasmListAddEntryDetailsPage.variableName);
});
And('I enter a value to the entry detail', () => {
    germplasmListPage.enterEntryDetailValue();
});
