export default class AddProgramPage{

    openCropNameOptions(){
        return getMainIframeDocumentWaitToLoad().find('.v-filterselect-button').should('exist')
            .click();
    }

    selectCropName(cropName:string){
        return getMainIframeDocument().find('span').contains(cropName).should('exist')
            .click();
    }

    enterProgramName(programName:string){
        return getMainIframeDocument().find('#vaadin_projectname_txt')
            .type(programName).type('{enter}');
    }

    clickSaveProgram(){
        cy.intercept('POST', `ibpworkbench/workbenchtools/UIDL?*`).as('saveProgram');
        getMainIframeDocument().find('#saveProjectButton').should('exist').click();
    }

    checkSaveProgramSuccess() {
        cy.wait('@saveProgram').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getMainIframeDocument().find('.v-Notification').should('exist');
            getMainIframeDocument().find('.v-Notification-error').should('not.exist');
        })
    }
}
const getMainIframeDocumentWaitToLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}

const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}

