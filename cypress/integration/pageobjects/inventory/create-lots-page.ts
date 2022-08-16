import { getIframeBody } from '../../../support/commands';

export default class CreateLotsPage{
    interceptSaveRequestFromManageGermplasm() {
        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/lots/generation?*`).as('createLots');
    }

    interceptSaveRequestFromManageInventory() {
        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/lots?programUUID=*`).as('createLots');
    }

    verifySuccessfulCreationFromManageGermplasm () {
        cy.wait('@createLots').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains(' lots were created successfully');
        })
    }

    verifySuccessfulCreationFromManageInventory () {
        cy.wait('@createLots').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            cy.wrap(interception.response?.body+'').as('newLotUID');
            getIframeBody().find('ngb-alert > span').contains('The new lot has been created successfully.');
        })
    }

    specifyGID(gid: string) {
        getIframeBody().find('#gid').type(gid);
    }

    specifyLotDetails(stockId: string, units: string, notes:string){
        getIframeBody().find('#stockIdPrefix').type(stockId);
        getIframeBody().find('#dropdownUnits')
            .should('exist').select(units, { force : true });
        getIframeBody().find('#lotNotes').type(notes);
    }

    specifyDepositDetails(amount:string, notes:string){
        getIframeBody().find('#depositAmount').type(amount);
        getIframeBody().find('#depositNotes').type(notes);
    }

    enableInitialDeposit(){
        getIframeBody().find('#depositAvailable').click();
    }

    confirmTransactionsOnSaving(){
        getIframeBody().find('#isConfirmDeposit').click();
    }

    clickSaveButton() {
        getIframeBody().find('[data-test="createLotsButton"]').should('exist').click();
    }
}
