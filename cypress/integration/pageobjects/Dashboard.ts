
class Dashboard{

    const cropName = Cypress.env('cropName');
    const program = Cypress.env('program');
 
    getProgramsIframeDocument = () => {
            return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist');
    }

    clickAddProgram(){
        return cy.get('.mat-button ng-star-inserted').should('exist').click();
    }

    getProgramsIframeBody = () => {
		return this.getProgramsIframeDocument().its('body').should('not.be.undefined').then(cy.wrap);
	}
    
    selectCrop(){
        
		this.getProgramsIframeBody().find('#cropDropdown select').should('exist').select(this.cropName, { force : true });
		this.getProgramsIframeBody().find('#cropDropdown select').should('have.value', this.cropName);

    }
    clickLaunchProgram(){
        this.getProgramsIframeBody().find('jhi-program > section > div:nth-child(1) > div.col-sm-4 > form > div:nth-child(2) > div.col-sm-auto > button').should('exist').click();

    }

    checkBMSVersion(){
        cy.xpath(`//div[contains(text(), "BMS 19")]`).should('exist');
    }
    
    }

}
export default Dashboard

