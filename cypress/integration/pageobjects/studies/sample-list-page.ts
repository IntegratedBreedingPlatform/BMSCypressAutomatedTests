import { getIframeBody } from '../../../support/commands';

export default class SampleListPage {
    clickSaveList(listName: string) {
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('p-tree > div > ul > p-treenode:nth-child(2) > li.ui-treenode > div').should('exist').click();
            cy.wrap($iframe).find('#sampleListName').type(listName);
            cy.wrap($iframe).find('#submitSampleList').click();
        });
    }
}

