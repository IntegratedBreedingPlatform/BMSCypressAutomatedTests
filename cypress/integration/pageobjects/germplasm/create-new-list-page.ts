import { getIframeBody } from '../../../support/commands';

export default class CreateNewListPage{
    interceptSaveRequest() {
        cy.intercept('POST', '**/germplasm-lists?*').as('createList');
    }

    verifySuccessAddToList () {
        cy.wait('@createList').then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
            getIframeBody().find('ngb-alert > span').contains('Germplasm list saved successfully!');
        })
    }

    clickCancelSaveList () {
        getIframeBody().find('[data-test="cancelSaveList"]').click();
    }
}
