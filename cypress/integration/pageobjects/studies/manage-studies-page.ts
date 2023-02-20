import { getIframeBody } from '../../../support/commands';
export default class ManageStudiesPage {

    browseExistingStudies() {
        getIframeBody().find('.control-label > a').contains('Browse').click();
    }

    selectExistingStudy(studyName: string) {
        getIframeBody().xpath('//div[@id=\'studyTreeModal\']//label[text()=\'Browse Studies\']').should('be.visible');
        getIframeBody().xpath(`//a[@class='dynatree-title' and text()='${studyName}']`).scrollIntoView().should('be.visible').click().then(() => {
            getIframeBody().xpath(`//div[@id='studyTreeModal']//button[text()='Open']`).click();
        });
    }

    startNewStudy() {
        getIframeBody().find('button[jhitranslate="study.manager.actions.new-study"]').should('exist').click();
    }
}

const getMainIframeDocumentWaitToLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}
const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}
