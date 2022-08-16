import { getIframeBody } from '../../../support/commands';

export default class WithdrawInventoryPage {

    setAmountForUnit(amount: string, unit: string) {
        getIframeBody().find(`#withdrawalAmount-${unit}`).type(amount);
    }

    setNotes(note: string) {
        getIframeBody().find('[data-test="withdrawalNotes"]').type(note);
    }

    toggleConfirmTransactionsCheckbox(check: boolean) {
        if (check) {
            getIframeBody().find('[data-test="confirmWithdrawalTransactionCheckbox"]').check();
        } else {
            getIframeBody().find('[data-test="confirmWithdrawalTransactionCheckbox"]').uncheck();
        }
    }

    clickCancel() {
        getIframeBody().find('[data-test="cancelWithdrawalTransactionButton"]').click();
    }

    clickSave() {
        cy.intercept('POST', `bmsapi/crops/${Cypress.env('cropName')}/transactions/pending-withdrawals/generation`).as('saveWithdrawalTransaction');
        getIframeBody().find('[data-test="saveWithdrawalTransactionButton"]').click();
        return new Cypress.Promise((resolve, reject) => {
            cy.wait('@saveWithdrawalTransaction', { timeout: 15000 }).then((interception) => {
                expect(interception.response?.statusCode).to.be.equal(201);
                resolve();
            });
        });
    }
    
}