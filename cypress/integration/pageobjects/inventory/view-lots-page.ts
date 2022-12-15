import { getIframeBody } from '../../../support/commands';

export default class ViewLotsPage{

    verifyLotDetailsDisplayed() {
        cy.intercept('GET', `bmsapi/crops/${Cypress.env('cropName')}/lots/search?programUUID=*`).as('lotsSearch');
        getIframeBody().find('[data-test="lotDetailDialog"]').should('exist');

        cy.wait('@lotsSearch').then((interception) => {
            expect(interception.response?.statusCode).to.be.equal(200);
            const respBody = interception.response?.body[0];
            expect(respBody).property('designation').to.be.oneOf(["TestGP1", "TestGP2", "TestGP3"])
        });
    }

    clickLotStockId() {
        getIframeBody().find('[data-test="lotStockId"]').should('be.visible').first().click({force:true});
    }
}
