
class DashboardPage{

    protected cropName = Cypress.env('cropName');
    protected program = Cypress.env('program');
 
    getProgramsIframeDocument = () => {
            return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist');
    }

    clickAddProgram(){
        return cy.xpath('//body/jhi-main/div/section/jhi-navbar/div/mat-toolbar/button[3]/span').should('exist').click();
    }

    getProgramsIframeBody = () => {
		return this.getProgramsIframeDocument().its('body').should('not.be.undefined').then(cy.wrap);
	}

	launchProgram() {
        this.selectCrop()
        this.clickLaunchProgram();
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

}
export default DashboardPage

