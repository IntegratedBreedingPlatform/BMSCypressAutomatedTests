import { getIframeBody } from '../../../support/commands';
import AddEntryDetailsContext from '../../tests/manage-lists/add-entry-details/add-entry-details.context';

export default class GermplasmListAddEntryDetailsPage {

    constructor(private addEntryDetailsContext: AddEntryDetailsContext) {
    }

    selectVariable() {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('#dropdownvariable .select2-selection__rendered')
                .should('be.visible')
                .click();

            cy.wrap($iframe).find('span.select2-results > ul > li:first-of-type')
                .should('exist')
                .click()
                .then(($li) => {
                    const variableName = $li.find('div:nth-child(2)').text().trim();
                    assert.isNotNull(variableName);

                    this.addEntryDetailsContext.variableName = variableName;
                });

            cy.wrap($iframe).find('[data-test="addEntryDetailSubmit"]')
                .should('exist')
                .click();
        });
    }

}
