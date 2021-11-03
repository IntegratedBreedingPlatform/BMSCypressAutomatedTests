
export default class DashboardPage{

    protected cropName = Cypress.env('cropName');
    protected programName = Cypress.env('existingProgramName');
 
    getProgramsIframeDocument = () => {
            return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist');
    }

    clickAddProgram(){
        // TODO add checking if release notes popup is shown, if so - close it
        return cy.xpath('//body/jhi-main/div/section/jhi-navbar/div/mat-toolbar/button[3]/span').should('exist').click();
    }

    getProgramsIframeBody = () => {
		return this.getProgramsIframeDocument().its('body').should('not.be.undefined').then(cy.wrap);
	}

	launchProgram(openSpecifiedProgram?:boolean) {
        // TODO add checking if release notes popup is shown, if so - close it
        this.selectCrop();
        if (openSpecifiedProgram){
            this.selectProgram();
        }
        this.clickLaunchProgram();
    }

    selectProgram(){
        this.getProgramsIframeBody().find('#programDropdown .select2-selection__rendered').should('be.visible').invoke('text').then((text) => {
            // select2 doesn't trigger change when programName is already selected so it always selects the first option for some reason
            // workaround: only perform selection when selected text is not yet the specified programName
            if (text != this.programName) {
                this.getProgramsIframeBody().find('#programDropdown').should('exist').click();
                this.getProgramsIframeBody().find('input[role="searchbox"]').should('be.visible')
                    .type(this.programName);
                this.getProgramsIframeBody().find('span.select2-results').contains('ul', this.programName).should('be.visible').click();
            }
        });
    }

    selectCrop(){
		return this.getProgramsIframeBody().find('#cropDropdown select')
        .should('exist').select(this.cropName, { force : true })
        .should('have.value', this.cropName);

    }
    clickLaunchProgram(){
       return this.getProgramsIframeBody().find('jhi-program > section > div:nth-child(1) > div.col-sm-4 > form > div:nth-child(2) > div.col-sm-auto > button').should('exist').click();

    }

    checkBMSVersion(){
        return cy.xpath(`//div[contains(text(), "BMS 19")]`).should('exist');
    }

    verifyPageLoaded() {
        // Verify Crop dropdown, Program dropdown and Launch buttons
        this.getProgramsIframeBody().find('#cropDropdown select').should('exist')
        this.getProgramsIframeBody().find('#programDropdown select').should('exist')
        this.getProgramsIframeBody().find('jhi-program > section > div:nth-child(1) > div.col-sm-4 > form > div:nth-child(2) > div.col-sm-auto > button').should('exist')
        this.getProgramsIframeBody().find(`jhi-program > section > div:nth-child(2) > div > nav > ul > li:nth-child(1) > a > span`)
            .should('exist').should(($sp) => {expect($sp).to.have.text('My Studies')});
        this.getProgramsIframeBody().find(`jhi-program > section > div:nth-child(2) > div > nav > ul > li:nth-child(2) > a > span`)
            .should('exist').should(($sp) => {expect($sp).to.have.text('My Lists')});
    }

    clickSiteAdmin() {
        // TODO add checking first if release notes popup is shown, if so - close it
    }

   signOut() {
       // TODO add checking first if release notes popup is shown, if so - close it
   }

   updateUserProfile() {
       // TODO add checking first if release notes popup is shown, if so - close it
   }

}

