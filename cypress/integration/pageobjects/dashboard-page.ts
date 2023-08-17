
import { closeReleaseNotePopupIfShown, getIframeBody } from '../../support/commands';
import LoginPage from './account-management/login-page';
export default class DashboardPage{

    protected cropName = Cypress.env('cropName');
    protected programName = Cypress.env('existingProgramName');
    login:LoginPage = new LoginPage()

    launchProgram(openSpecifiedProgram?:boolean) {
        this.selectCrop();
        if (openSpecifiedProgram){
            this.selectProgram();
        }
        this.clickLaunchProgram();
    }

    selectProgram(){
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).find('#programDropdown > select > option').should('exist').invoke('text').then((text) => {
                // select2 doesn't trigger change when programName is already selected so it always selects the first option for some reason
                // workaround: only perform selection when selected text is not yet the specified programName
                if (text != this.programName) {
                    cy.wrap($iframe).find('#programDropdown').should('exist').click()
                    cy.wrap($iframe).find('#programDropdown > select > option').should('exist').select(this.programName).then(()=>{
                            cy.wrap($iframe).find('#programDropdown > select > option').should('have.text',this.programName);

                    });
                }  
            });
        });
    }

    selectCrop(){
		return getIframeBody().find('#cropDropdown select')
        .should('exist').select(this.cropName, { force : true })
        .should('have.value', this.cropName);

    }
    clickLaunchProgram(){
       getIframeBody().find('[data-test="launchProgramButton"]').should('exist').click();

    }

    verifyPageLoaded() {
        // Verify Crop dropdown, Program dropdown and Launch buttons
        getIframeBody().find('[data-test="dashboardCropDropdown"]').should('exist')
        getIframeBody().find('[data-test="dashboardProgramDropdown"]').should('exist')
        getIframeBody().find('[data-test="launchProgramButton"]').should('exist')
        getIframeBody().find(`jhi-program > section > div:nth-child(2) > div > nav > ul > li:nth-child(1) > a > span`)
            .should('exist').should(($sp) => {expect($sp).to.have.text('My Studies')});
        getIframeBody().find(`jhi-program > section > div:nth-child(2) > div > nav > ul > li:nth-child(2) > a > span`)
            .should('exist').should(($sp) => {expect($sp).to.have.text('My Lists')});
    }

    verifyDefaultDashboardPage(){
        closeReleaseNotePopupIfShown();
        getIframeBody().find('[data-test="dashboardCropDropdown"]').should('exist')
        getIframeBody().find('[data-test="dashboardProgramDropdown"]').should('exist')
        getIframeBody().find('[data-test="launchProgramButton"]').should('exist')

    }
    loginAndLaunchProgram(){

        if(this.login.getToken('bms.xAuthToken')==null){
            this.login.performLogin();
            closeReleaseNotePopupIfShown();    
            this.launchProgram(true);    
        }
    }
}

