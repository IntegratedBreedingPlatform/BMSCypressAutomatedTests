import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import CreateStudyPage from '../../../pageobjects/studies/create-study-page';
import ImportCrossesPage from '../../../pageobjects/studies/import-crosses-page';
import SaveListTreeModalPage from '../../../pageobjects/studies/save-list-tree-modal-page';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import AddEntryDetailsContext from '../add-entry-details/add-entry-details.context';
import GermplasmListPage from '../../../pageobjects/germplasm-lists/germplasm-lists-page';

const createStudyPage = new CreateStudyPage();
const importCrossesPage = new ImportCrossesPage();
const saveListTreeModalPage = new SaveListTreeModalPage();
const searchPage = new GermplasmListsBetaPage();

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);

let listName = 'Cross-' + Date.now();

And('I imported a cross and created a cross list', () => {
    let studyName = Cypress.env('rcbdStudy');
    createStudyPage.clickStudyAction('Export crossing template', 'Crossing options');
    cy.verifyDownload(`CrossingTemplate-${studyName}.xls`);
    createStudyPage.clickStudyAction("Import Crosses", "Crossing options");

    importCrossesPage.uploadFile(`CrossingTemplate-${studyName}.xls`);
    importCrossesPage.processAutomaticNamingCrossesImport();

    saveListTreeModalPage.setListName(listName);
    saveListTreeModalPage.save();
});

When('I open the cross list', () => {
    searchPage.selectListFilteredByListName(listName);
});

And('I add cross column', () => {
    germplasmListPage.addDisplayedColumn('CROSS');
});

And('I fill the column with cross expansion', () => {
    germplasmListPage.selectExpansionLevel();
});

Then('I should see the cross expansion value of the entries', () => {
    germplasmListPage.checkCrossExpansionUpdate();
});




