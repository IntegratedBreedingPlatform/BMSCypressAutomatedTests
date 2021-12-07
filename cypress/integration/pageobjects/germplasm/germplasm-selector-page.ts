import { getIframeBody } from '../../../support/commands';


export default class GermplasmSelectorPage {

    
    clickSelectButton() {
        getModalContent().find('[data-test="selectButton"]').should('be.visible').click();
    }

    selectAllPages() {
        getModalContent().find('#check-select-all').should('be.visible').check();
    }

    selectAllEntriesCurrentPage() {
        getModalContent().find('[data-test="selectAllCurrentPage"]').should('be.visible').check();
    }

    selectRandomEntries() {
        // Select 3 entries randomly
        getModalContent().xpath(`(//table[@data-test="germplasmSelectorTable"]//input)[${Math.floor(Math.random() * 10)}]`).check();
        getModalContent().xpath(`(//table[@data-test="germplasmSelectorTable"]//input)[${Math.floor(Math.random() * 10)}]`).check();
        getModalContent().xpath(`(//table[@data-test="germplasmSelectorTable"]//input)[${Math.floor(Math.random() * 10)}]`).check();
    }

    verifyGermplasmSelectorModalIsShown() {
        getIframeBody().find('[data-test="germplasmSelectorModal"]').should('be.visible');
    }
}

const getModalContent = () => {
    return getIframeBody().find('jhi-germplasm-selector-modal > div > iframe', {timeout: Cypress.config('pageLoadTimeout')})
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
};