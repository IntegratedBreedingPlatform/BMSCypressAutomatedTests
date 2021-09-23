export default class ManageGermplasmPage{

    openGermplasm(){
        cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframeBody) => {
            cy.wrap($iframeBody).find('table > tbody > tr:nth-child(1) > td:nth-child(2) > a').should('exist').click().then(($a) => {
                const gid = $a.text();
                cy.wrap($iframeBody).find('[jhitranslate="germplasm-details.header"] > span').should('exist').contains('Germplasm Details:');
                cy.wrap($iframeBody).find('.modal-title').should('exist').contains('(GID: ' + gid + ')');
            });
        });
    }

}