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
        getIframeBody().xpath('//nav/ul/li[3]/a').should('exist').contains(clonedListName);
    }

    verifyDuplicateNameErrorMessage() {
        cy.intercept('POST', `**/clone?*`).as('cloneList');
        cy.wait('@cloneList',{ timeout: 60000}).then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            getIframeBody().find('ngb-alert > span',{ timeout: 120000})
                .contains('There is an existing item with the same name you have entered. Please enter a different name.',{ timeout: 120000});
        });
    }
}