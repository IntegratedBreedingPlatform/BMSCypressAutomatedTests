import { getIframeBody } from '../../../support/commands';

export default class GermplasmListCloneListPage {
    verifySuccessMessage() {
        cy.intercept('POST', `**/germplasm-lists/search?*`).as('loadLists');
        cy.wait('@loadLists',{ timeout: 60000}).then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            getIframeBody().find('ngb-alert > span',{ timeout: 120000}).contains('Germplasm list cloned successfully!',{ timeout: 120000});
        });
    }

    verifyClonedListIsOpened(clonedListName: string) {
        cy.xpath("//body/jhi-main/div/section/jhi-germplasm-list/section/div/section/nav/ul/li[3]/a", { timeout: Cypress.config('pageLoadTimeout') })
            .should('exist').contains(clonedListName);
    }
}