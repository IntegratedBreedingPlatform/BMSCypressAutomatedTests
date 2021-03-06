export default class ManageStudiesPage {

    browseExistingStudies() {
        getMainIframeDocumentWaitToLoad().find('.control-label > a').contains('Browse').click();
    }

    selectExistingStudy(studyName: string) {
        getMainIframeDocument().xpath('//div[@id=\'studyTreeModal\']//label[text()=\'Browse Studies\']').should('be.visible');
        getMainIframeDocument().xpath(`//a[@class='dynatree-title' and text()='${studyName}']`).scrollIntoView().should('be.visible').click().then(() => {
            getMainIframeDocument().xpath(`//div[@id='studyTreeModal']//button[text()='Open']`).click();
        });
    }

    startNewStudy() {
        getMainIframeDocumentWaitToLoad().xpath(`//a[contains(text(),'Start a New Study')]`).click();
    }
}

const getMainIframeDocumentWaitToLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}
const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}
