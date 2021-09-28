export default class GermplasmDetailsPage{

   clickTab(tab:string) {
       switch (tab) {
           case 'Pedigree' :
               getGermplasmIframeBodyWaitLoad().find(`[jhitranslate="germplasm-details.pedigree"]`).should('exist').click();
               break;
           default: getGermplasmIframeBodyWaitLoad().find(`[jhitranslate="germplasm-details.germplasm"]`).click();
       }

   }

   verifyPedigreeTree() {
       getGermplasmIframeBody().find('p-tree > div > ul > p-treenode > li > div > span.ui-treenode-label > span > a').should('exist');
       getGermplasmIframeBody().find('div.table-responsive > label').should('exist').should('contain', 'Generation');
   }


   viewPedigreeGraph() {
       getGermplasmIframeBody().xpath(`//span[contains(text(), 'View Pedigree Graph')]`, {timeout: 15000}).should('be.visible').click();
   }

   verifyPedigreeGraph() {
       getGermplasmIframeBody().xpath(`//h4//span[contains(text(), 'Pedigree Graph')]`, {timeout: 15000}).should('be.visible');
       getGermplasmIframeBody().find('jhi-germplasm-details-graphviz-modal > div > div.modal-body > jhi-pedigree-graph > div:nth-child(2) > div > div.pedigree-graph > svg').should('exist');
   }




}

const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}

const getGermplasmIframeBodyWaitLoad = () => {
    return getMainIframeDocument().find('iframe').waitIframeToLoad().then(cy.wrap);
}

const getGermplasmIframeBody = () => {
    return getMainIframeDocument().find('iframe').its('0.contentDocument').should('exist')
        .its('body').should('not.be.undefined').then(cy.wrap);
}