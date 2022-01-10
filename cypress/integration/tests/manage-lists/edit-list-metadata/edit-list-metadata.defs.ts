import { Given, And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import GermplasmListsBetaPage from '../../../pageobjects/germplasm-lists/germplasm-lists-beta-page';
import GermplasmListPage from "../../../pageobjects/germplasm-lists/germplasm-lists-page";
import AddEntryDetailsContext from "../add-entry-details/add-entry-details.context";
import { randomString } from '../../../../support/commands';
import GermplasmListEditListMetadataPage from '../../../pageobjects/germplasm-lists/germplasm-list-edit-list-metadata-page';
import GermplasmListImportPage from '../../../pageobjects/germplasm-lists/germplasm-list-import-page';

const addEntryDetailsContext = new AddEntryDetailsContext();
const germplasmListPage = new GermplasmListPage(addEntryDetailsContext);
const germplasmListEditListMetadataPage = new GermplasmListEditListMetadataPage();
const searchPage = new GermplasmListsBetaPage();
let importModal = new GermplasmListImportPage();

var listName: string;

Given('I import a new list', () => {
    listName = 'list name ' + randomString();

    searchPage.openImportGermplasmListModal();
    importModal.importNewList(listName);
});

And('I open the imported list', () => {
    searchPage.selectListFilteredByListName(listName);
});

And('I open an existing list', () => {
    searchPage.openGermplasmList();
});

When('I navigate to edit metadata screen', () => {
    germplasmListPage.openEditListMetadata();
});

And('I save list metadata changes', () => {
    germplasmListEditListMetadataPage.clickModalSave();
});

Then('a success message that list metadata is saved displays', () => {
    germplasmListEditListMetadataPage.verifySuccessEditMetadata();
});

And('I entered list name that exceeds max char length', () => {
    germplasmListEditListMetadataPage.enterInvalidName();
});

And('I entered list description that exceeds max char length', () => {
    germplasmListEditListMetadataPage.enterInvalidDescription();
});

And('I entered list name that exists in another list', () => {
    germplasmListEditListMetadataPage.enterNewName(listName);
});

And('I modified all existing list metadata with valid inputs', () => {
    germplasmListEditListMetadataPage.fillUpValidInfo();
});

Then('an error message that name must not exceed 50 characters displays', () => {
    germplasmListEditListMetadataPage.verifyError("name must not exceed 50 characters");
});

Then('an error message that description must not exceed 255 characters displays', () => {
    germplasmListEditListMetadataPage.verifyError("description must not exceed 255 characters");
});

Then('an error message that there is an existing item with the same name displays', () => {
    germplasmListEditListMetadataPage.verifyError("There is an existing item with the same name you have entered. Please enter a different name.");
});
