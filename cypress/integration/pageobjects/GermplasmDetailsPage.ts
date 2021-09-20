class GermplasmDetailsPage{

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
       getGermplasmIframeBody().find(`[jhitranslate="pedigree.tree.view-pedigree-graph"]`).should('exist').click();
   }

   verifyPedigreeGraph() {
       getGermplasmIframeBody().find('jhi-germplasm-details-graphviz-modal > div > div.modal-header > div > h4 > span').should('exist').contains('Pedigree Graph');
       getGermplasmIframeBody().find('jhi-germplasm-details-graphviz-modal > div > div.modal-body > jhi-pedigree-graph > div:nth-child(2) > div > div.pedigree-graph > svg').should('exist');
   }




}

const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist');
}

const getGermplasmIframeBodyWaitLoad = () => {
    return getMainIframeDocument().its('body').should('not.be.undefined').then(cy.wrap).find('iframe').waitIframeToLoad().then(cy.wrap);
}

const getGermplasmIframeBody = () => {
    return getMainIframeDocument().its('body').should('not.be.undefined').then(cy.wrap).find('iframe').its('0.contentDocument').should('exist')
        .its('body').should('not.be.undefined').then(cy.wrap);
}
export default GermplasmDetailsPage