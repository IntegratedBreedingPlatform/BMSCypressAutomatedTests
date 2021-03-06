import { getIframeBody } from '../../../support/commands';


export default class GermplasmSelectorPage {

    filterByGIDs(gids: number[]) {
        getModalContent().xpath(`//button[contains(@title, 'GID ::')]`).should('be.visible').click();
        getModalContent().find('[data-test="columnFilterListInput"]').should('be.visible').type(gids.join(','));
        getModalContent().find('[data-test="columnFilterListApplyButton"]').should('be.visible').click();
    }

    clickSelectButton() {
        cy.intercept('GET', `**/search?*`).as('loadList');
        getModalContent().find('[data-test="selectButton"]').should('be.visible').click();
    }

    selectAllPages() {
        getModalContent().find('#check-select-all').should('be.visible').check();
    }

    selectAllEntriesCurrentPage() {
        getModalContent().find('[data-test="selectAllCurrentPage"]').should('be.visible').check();
    }

    selectRandomEntries() {
        // Select 3 entries randomly (1-10)
        getModalContent().xpath(`(//table[@data-test="germplasmSelectorTable"]//input)[${Math.floor(Math.random() * 10) + 1}]`).check();
        getModalContent().xpath(`(//table[@data-test="germplasmSelectorTable"]//input)[${Math.floor(Math.random() * 10) + 1}]`).check();
        getModalContent().xpath(`(//table[@data-test="germplasmSelectorTable"]//input)[${Math.floor(Math.random() * 10) + 1}]`).check();
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
