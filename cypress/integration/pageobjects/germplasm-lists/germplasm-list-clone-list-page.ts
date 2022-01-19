import { getIframeBody, randomString } from '../../../support/commands';

export default class GermplasmListCloneListPage {
    verifySuccessMessage() {
        cy.wait('@loadList',{ timeout: 60000}).then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            getIframeBody().find('ngb-alert > span',{ timeout: 120000}).contains('Germplasm list cloned successfully!',{ timeout: 120000});
        });
    }
}