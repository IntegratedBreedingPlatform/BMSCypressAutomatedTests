
import { closeReleaseNotePopupIfShown, getIframeBody } from '../../support/commands';
import LoginPage from './account-management/login-page';
export default class DashboardPage{

    protected cropName = Cypress.env('cropName');
    protected programName = Cypress.env('existingProgramName');
    login:LoginPage = new LoginPage()

    getProgramsIframeDocument = () => {
        return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist');
    }

    getProgramsIframeBody = () => {
		return this.getProgramsIframeDocument().its('body').should('not.be.undefined').then(cy.wrap);
	}

    launchProgram(openSpecifiedProgram?:boolean) {
        closeReleaseNotePopupIfShown();
        this.selectCrop();
        if (openSpecifiedProgram){
            this.searchAndSelectProgram(this.programName);
        }
        this.clickLaunchProgram();
    }

    searchAndSelectProgram(programName: string){
        getIframeBody().then(($iframe) => {
            cy.wrap($iframe).xpath('//*[@data-test="dashboardProgramDropdown"]/select/option').should('be.visible').invoke('text').then((text) =>{
                cy.log(text);
                if(text!=programName){
                    cy.wrap($iframe).find('[data-test="dashboardProgramDropdown"]').click();
                    cy.wrap($iframe).xpath('//body/span/span/span[1]/input').should('be.visible').type(programName).type('{enter}');     

                }
            });
     });

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
       this.getProgramsIframeBody().find('[data-test="launchProgramButton"]').should('exist').click();

    }

    verifyPageLoaded() {
        // Verify Crop dropdown, Program dropdown and Launch buttons
        closeReleaseNotePopupIfShown();
        this.getProgramsIframeBody().find('#cropDropdown select').should('exist')
        this.getProgramsIframeBody().find('#programDropdown select').should('exist')
        this.getProgramsIframeBody().find('jhi-program > section > div:nth-child(1) > div.col-sm-4 > form > div:nth-child(2) > div.col-sm-auto > button').should('exist')
        this.getProgramsIframeBody().find(`jhi-program > section > div:nth-child(2) > div > nav > ul > li:nth-child(1) > a > span`)
            .should('exist').should(($sp) => {expect($sp).to.have.text('My Studies')});
        this.getProgramsIframeBody().find(`jhi-program > section > div:nth-child(2) > div > nav > ul > li:nth-child(2) > a > span`)
            .should('exist').should(($sp) => {expect($sp).to.have.text('My Lists')});
    }

    loginAndLaunchProgram(){

        if(this.login.getToken('bms.xAuthToken')==null){
            this.login.performLogin();    
            this.launchProgram(true);    
        }else{
          return;
        }
    }
}

