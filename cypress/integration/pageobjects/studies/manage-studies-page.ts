import { getIframeBody } from '../../../support/commands';

export default class ManageStudiesPage {

    browseExistingStudies() {
        getMainIframeDocumentWaitToLoad().find('[jhitranslate="study.manager.browse-link"]').contains('Browse').click();
    }

    selectExistingStudy(studyName: string) {
        getMainIframeDocument().xpath(`//h4[contains(text(),'Browse for studies')]`).should('be.visible');
        getMainIframeDocument().find(`.ui-treenode-label > span > span`).contains("Studies").should('be.visible').click().then(()=>{
            getMainIframeDocument().find(`.ui-treenode-label > span > span`).contains(studyName).scrollIntoView().should('be.visible').click().then(() => {
            getMainIframeDocument().xpath(`//button[contains(text(),'Open')]`).click();
        });
        }));
    }

    startNewStudy() {
        cy.window().then((win) => {
            win.top.addEventListener("message", (e) => {
                win.postMessage({...e.data}, '*');
            })
        });

        getIframeBody().find('[data-test="startNewStudyButton"]').should('exist').click();
    }
}

const getMainIframeDocumentWaitToLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}
const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}
