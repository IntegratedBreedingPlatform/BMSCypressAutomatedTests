export default class CreateStudyPage{

    clickTab(tab:string) {
        getMainIframeDocument().xpath(`//ul[@id='manage-trial-tab-headers']//li/a[text()='${tab}']`).should('be.visible').click();
    }

    enterStudyName(studyName:string){
        return getMainIframeDocument().get('input[ng-model="data.studyName"]').should('exist').type(studyName)
    }

    generateRCBDesign () {
        cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframeBody) => {
            this.clickTab("Experimental Design");
        });
        getMainIframeDocument().xpath(`//section-container[contains(@heading,'CHOOSE A DESIGN TYPE')]//div[contains(@class,'select2-container')]`).should('be.visible').click();
        getMainIframeDocument().xpath(`//div[contains(@class,'select2-result-label') and contains(text(),'Randomized Complete Block Design')]`).should('be.visible').click();
        getMainIframeDocument().xpath(`//input[@id='txtStartingPlotNo']`).should('be.visible').clear().type('1', {delay: 0});
        getMainIframeDocument().xpath(`//input[@name='replicationsCount']`).should('be.visible').clear().type('2', {delay: 0});
        getMainIframeDocument().xpath(`//input[@type='submit' and @value='Generate Design']`).should('be.visible').click();

        // Wait for modal to load and click the Generate button
        cy.intercept('POST', `**/generation`).as('generate');
        getMainIframeDocument().xpath(`//div[contains(@class,'modal-dialog')]//label[text()='Generate Design']`, {timeout: 15000}).should('be.visible');
        getMainIframeDocument().xpath(`//div[contains(@class,'modal-dialog')]//button[text()='Generate']`).should('be.visible').click();
    }

    checkGenerateDesignSuccess() {
        cy.wait('@generate').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getMainIframeDocument().xpath(`//div[@id='notification-container']//h1[text()='Success']`).should('be.visible');
        });
    }

    deleteGeneratedDesign() {
        cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(() => {
            getMainIframeDocument().xpath(`//ul[@id='manage-trial-tab-headers']//li/a[text()='Experimental Design']`).should('be.visible').click().then(() => {
                getMainIframeDocument().xpath(`//input[@type='button' and @value='Delete Design']`).should('be.visible').first().click({force:true});
                getMainIframeDocument().xpath(`//div[contains(@class,'modal-dialog')]//div[contains(@class,'modal-footer')]//button[text()='Yes']`).should('be.visible').first().click();
            });
        });
    }
}

const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}

