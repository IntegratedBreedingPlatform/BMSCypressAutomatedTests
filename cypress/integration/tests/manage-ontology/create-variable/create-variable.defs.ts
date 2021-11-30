import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ManageOntologiesPage, { OntologyTerm } from '../../../pageobjects/ontology/manage-ontologies-page';

const manageOntologiesPage = new ManageOntologiesPage();

When('I click on add new ontology term button', () => {
    manageOntologiesPage.openAddNewOntologyTermPanel();
});
And('I select {} type', (termName: string) => {
    const term: OntologyTerm = OntologyTerm.getTermByName(termName);
    manageOntologiesPage.selectTerm(term);
});
And('I specified the {} name and description', (termName: string) => {
    manageOntologiesPage.addVariableName();
    manageOntologiesPage.addTermDescription();
});
And('I added a new property', () => {
    manageOntologiesPage.addNewPropertyWithinAddNewVariableSection();
});
And('I added a new method', () => {
    manageOntologiesPage.addNewMethodWithinAddNewVariableSection();
});
And('I added a new {} scale', (scaleType: string) => {
    manageOntologiesPage.addNewScaleWithinAddNewVariableSection(scaleType);
});
And('I selected {} type', (variableType: string) => {
    manageOntologiesPage.selectVariableType(variableType);
});
And('I saved the details', () => {
    manageOntologiesPage.saveTerm(OntologyTerm.VARIABLES);
});
Then('I should be able to search and see the added {} in the list', (termName: string) => {
    const term: OntologyTerm = OntologyTerm.getTermByName(termName);
    manageOntologiesPage.checkTermIsInList(term);
});
