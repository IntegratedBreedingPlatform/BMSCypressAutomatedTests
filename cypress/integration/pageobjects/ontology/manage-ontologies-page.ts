import { getIframeBody, randomString } from '../../../support/commands';

export default class ManageOntologiesPage {

    private iframeLoaded: boolean = false;
    private variableName: string | undefined;
    private propertyName: string | undefined;
    private methodName: string | undefined;
    private scaleName: string | undefined;

    openAddNewOntologyTermPanel() {
        this.reset();
        this.doClickAction('[data-test="addNewOntologyTermButton"]');
    }

    selectTerm(term: OntologyTerm) {
        this.doClickAction(`[data-test="${term.name.toLocaleLowerCase()}Term"]`)
            .then(($element) => {
                this.assertAddNewTermTitle(term);
            });
    }

    addVariableName() {
        const variableName = this.addTermName(OntologyTerm.VARIABLES);
        this.variableName = variableName;
    }

    addTermDescription() {
        this.getOntologyBrowserIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('textarea[name=omDescription]')
                .should('exist')
                .type('This is a description');
        });
    }

    addNewPropertyWithinAddNewVariableSection() {
        this.getOntologyBrowserIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test=addNewPropertyButton]')
                .should('exist')
                .click()
                .then(($row) => {
                    this.addNewProperty();
                });
        });
    }

    addNewMethodWithinAddNewVariableSection() {
        this.getOntologyBrowserIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test=addNewMethodButton]')
                .should('exist')
                .click()
                .then(($row) => {
                    this.addNewMethod();
                });
        });
    }

    addNewScaleWithinAddNewVariableSection(scaleType: string) {
        this.getOntologyBrowserIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('[data-test=addNewScaleButton]')
                .should('exist')
                .click()
                .then(($row) => {
                    this.addNewScale(scaleType);
                });
        });
    }

    addNewProperty() {
        this.getOntologyBrowserIframeBody()
            .then(($iframe) => {
                this.assertAddNewTermTitle(OntologyTerm.PROPERTIES);
                const propertyName = this.addTermName(OntologyTerm.PROPERTIES);
                this.propertyName = propertyName;

                this.addTermDescription();

                cy.wrap($iframe).find('div.suggestions-wrapper')
                    .should('exist')
                    .click()
                    .then(($suggestions) => {
                        cy.wrap($suggestions).find('ul.suggestions-list > li:first-of-type')
                            .should('exist')
                            .click();
                    });

                this.saveTerm(OntologyTerm.PROPERTIES);
            })
    }

    addNewMethod() {
        this.getOntologyBrowserIframeBody()
            .then(($iframe) => {
                this.assertAddNewTermTitle(OntologyTerm.METHODS);
                const methodName = this.addTermName(OntologyTerm.METHODS);
                this.methodName = methodName;
                this.addTermDescription();
                this.saveTerm(OntologyTerm.METHODS);
            });
    }

    addNewScale(scaleType: string) {
        this.getOntologyBrowserIframeBody()
            .then(($iframe) => {
                this.assertAddNewTermTitle(OntologyTerm.SCALES);
                const scaleName = this.addTermName(OntologyTerm.SCALES);
                this.scaleName = scaleName;
                this.addTermDescription();

                cy.wrap($iframe).find('om-select[name="omDataType"] > div.ui-select-container')
                    .should('exist')
                    .click()
                    .then(($container) => {
                        cy.wrap($container).find('div.select2-search > input')
                            .should('exist')
                            .type(scaleType);

                        cy.wrap($container).find('ul.ui-select-choices > li:first-of-type')
                            .should('exist')
                            .click();
                    });

                if (scaleType === 'categorical') {
                    const categoryName = `categoricalName${randomString()}`;
                    cy.wrap($iframe).find('input[name="omCategoryName1"]')
                        .should('exist')
                        .type(categoryName);

                    cy.wrap($iframe).find('input[name="omCategoryDescription1"]')
                        .should('exist')
                        .type('This is a description');


                }

                this.saveTerm(OntologyTerm.SCALES);
            });
    }

    selectVariableType(variableType: string) {
        this.getOntologyBrowserIframeBody()
            .then(($iframe) => {
                cy.wrap($iframe).find('om-multi-select[name="omVariableTypes"]')
                    .should('exist')
                    .click()
                    .then(($container) => {
                        cy.wrap($container).find('div.suggestions-wrapper > input')
                            .should('exist')
                            .type(variableType);

                        cy.wrap($container).find('ul.suggestions-list > li:first-of-type')
                            .should('exist')
                            .click();
                    });
            });
    }

    saveTerm(term: OntologyTerm) {
        this.getOntologyBrowserIframeBody().then(($iframe) => {
            cy.wrap($iframe).find(`[data-test="save${term.name}Button"]`)
                .should('exist')
                .click();
        });
    }

    checkTermIsInList(term: OntologyTerm) {
        this.getOntologyBrowserIframeBody().then(($iframe) => {
            cy.wrap($iframe).find(`om-search > div.search > input`)
                .should('exist')
                .type(<string>this.variableName);

            cy.wrap($iframe).find(`om-list[om-list-name=${term.tabName.toLocaleLowerCase()}] > table > tbody > tr:not(.om-no-items)`)
                .should('exist')
                .should('have.length', 1)
                .then(($tr) => {
                    cy.wrap($tr).find('td:nth-child(1) > span').should('exist').contains(<string>this.variableName);
                    cy.wrap($tr).find('td:nth-child(3) > span').should('exist').contains(<string>this.propertyName);
                    cy.wrap($tr).find('td:nth-child(4) > span').should('exist').contains(<string>this.methodName);
                    cy.wrap($tr).find('td:nth-child(5) > span').should('exist').contains(<string>this.scaleName);
                });
        });
    }

    navigateToTab(term: OntologyTerm) {
        this.doClickAction(`[data-test="${term.tabName}Tab"] > a`);
    }

    private doClickAction(selector: string) {
        return this.getOntologyBrowserIframeBody().find(selector)
            .should('exist')
            .click();
    }

    private getOntologyBrowserIframeBody() {
        // TODO: fix me! wait must be removed. There is an issue when getting the content of the iframe. For some reason the iframe body's content
        // is not the one that should be in ontology.html. I guess this is due that angularJS replace the body when is it's fully rendered but Cypress doesn't
        // detect that change in the iframe and it sticks with the content of the body when the iframe is loading
        if (!this.iframeLoaded) {
            cy.wait(1000);
            this.iframeLoaded = true;
        }
        return getIframeBody();
    }

    private addTermName(term: OntologyTerm) {
        const termName = `${term.name}Name${randomString()}`;
        this.getOntologyBrowserIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('input[name=omName]')
                .should('exist')
                .type(termName);
        });
        return termName;
    }

    private assertAddNewTermTitle(term: OntologyTerm) {
        this.getOntologyBrowserIframeBody().then(($iframe) => {
          cy.wrap($iframe).find('h2.om-title')
              .should('exist')
              .contains(`Add New ${term.name}`);
        })
    }

    // TODO: remove it once the iframe loading issue is solved
    private reset() {
        this.iframeLoaded = false;
    }

}

export class OntologyTerm {

    public static readonly VARIABLES = new OntologyTerm('Variable', 'Variables');
    public static readonly PROPERTIES = new OntologyTerm('Property', 'Properties');
    public static readonly METHODS = new OntologyTerm('Method', 'Methods');
    public static readonly SCALES = new OntologyTerm('Scale', 'Scales');

    private static TABS: OntologyTerm[] = [
        OntologyTerm.VARIABLES,
        OntologyTerm.PROPERTIES,
        OntologyTerm.METHODS,
        OntologyTerm.SCALES,
    ]

    constructor(public name: string,
                public tabName: string) {
    }

    public static getTermByTagName(tabName: string): OntologyTerm {
        const term = OntologyTerm.TABS.filter((term: OntologyTerm) => term.tabName === tabName);
        if (term.length > 0) {
            return term[0];
        }
        throw new Error('Could not find tab with name: ' + tabName);
    }

    public static getTermByName(termName: string): OntologyTerm {
        const term = OntologyTerm.TABS.filter((term: OntologyTerm) => term.name === termName);
        if (term.length > 0) {
            return term[0];
        }
        throw new Error('Could not term  with name: ' + termName);
    }

}
