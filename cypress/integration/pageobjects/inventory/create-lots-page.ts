import { getIframeBody } from '../../../support/commands';

export default class CreateLotsPage{
    interceptSaveRequest() {
        cy.intercept('POST', '**/lots/generation?*').as('createLots');
    }

    verifySuccessfulCreation () {
        cy.wait('@createLots').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().find('ngb-alert > span').contains(' lots were created successfully');
        })
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
