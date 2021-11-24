import { getIframeBody } from '../../../support/commands';

export default class GermplasmListAddEntryDetailsPage {

    private _variableName: string | undefined;

    selectVariable() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('#dropdownvariable')
                .should('exist')
                .click();

            cy.wrap($iframe).find('span.select2-results > ul > li:first-of-type')
                .should('exist')
                .click()
                .then(($li) => {
                    const variableName = $li.find('div:nth-child(2)').text().trim();
                    assert.isNotNull(variableName);

                    this._variableName = variableName;
                });

            cy.wrap($iframe).find('[data-test="addEntryDetailSubmit"]')
                .should('exist')
                .click();
        });
    }

    get variableName(): string {
        return <string>this._variableName;
    }

}
