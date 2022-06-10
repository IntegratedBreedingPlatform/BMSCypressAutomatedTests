import { getIframeBody } from "../../../support/commands";

export default class SaveListTreeModalPage {

    save() {
        cy.intercept('POST', `Fieldbook/ListTreeManager/saveList`).as('saveList');
        getIframeBody().find('[data-test="saveGermplasmListOKButton"]').should('be.visible').click();
    }

    setListName(listName: string) {
        cy.wait(5000);
        getIframeBody().find('#saveListTreeModal').should('exist').then(() => {
            getIframeBody().find('[data-test="listNameTextBox"]').should('be.visible').type(listName);
        });
     }

    verifySuccessSaveList() {
        cy.wait('@saveList').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().xpath(`//div[@id='notification-container']/div/p[text()='List data was saved successfully.']`).should('be.visible');
        });
    }

}