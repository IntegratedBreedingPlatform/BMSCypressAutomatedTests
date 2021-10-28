export default class ManageStudiesPage{

    browseExistingStudies(){
        cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframeBody) => {
            cy.wrap($iframeBody).find('.control-label > a').contains('Browse').click();
        });
    }

    selectExistingStudy(studyName:string){
        getMainIframeDocument().xpath("//div[@id='studyTreeModal']//label[text()='Browse Studies']").should('be.visible');
        getMainIframeDocument().xpath(`//a[@class='dynatree-title' and text()='${studyName}']`).scrollIntoView().should('be.visible').click().then(() => {
            getMainIframeDocument().xpath(`//div[@id='studyTreeModal']//button[text()='Open']`).click();
        });
    }
}

const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}
