import { getIframeBody } from '../../../support/commands';

export default class DepositInventoryPage {

    setAmountForUnit(amount: string, unit: string) {
        getIframeBody().find(`#depositAmount-${unit}`).type(amount);
    }

    setNotes(note: string) {
        getIframeBody().find('[data-test="depositNotes"]').type(note);
    }

    toggleConfirmTransactionsCheckbox(check: boolean) {
        if (check) {
            getIframeBody().find('[data-test="confirmDepositTransactionCheckbox"]').check();
        } else {
            getIframeBody().find('[data-test="confirmDepositTransactionCheckbox"]').uncheck();
        }
    }

    clickCancel() {
        getIframeBody().find('[data-test="cancelDepositTransactionButton"]').click();
    }

    clickSave() {
        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/transactions/pending-deposits/generation`).as('saveDepositTransaction');
        getIframeBody().find('[data-test="saveDepositTransactionButton"]').click();
        return new Cypress.Promise((resolve, reject) => {
            cy.wait('@saveDepositTransaction', { timeout: 15000 }).then((interception) => {
                expect(interception.response?.statusCode).to.be.equal(201);
                resolve();
            });
        });
    }

}