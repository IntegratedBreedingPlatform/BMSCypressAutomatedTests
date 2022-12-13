import { getIframeBody } from '../../../support/commands';

export default class ViewLotsPage{
    verifyLotDetailsDisplayed() {
        getIframeBody().find('[data-test="lotDetailDialog"]').should('exist');
    }

    clickLotStockId() {
        getIframeBody().find('[data-test="lotStockId"]').should('exist').first().click();
    }
}
