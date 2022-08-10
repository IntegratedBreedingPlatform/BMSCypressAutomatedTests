import { getIframeBody } from '../../support/commands';

export default class AddProgramPage{

    openCropNameOptions(){
        cy.get('#updatePersonalHeader').should('exist');
        cy.get('[data-test="cropDropdown"]').should('exist')
                .click();
    }

    selectCropName(cropName:string){
        // Select the first result
        cy.xpath('//body/span/span/span[1]/input').should('be.visible').type(cropName);
        cy.xpath(`//span[contains(@class,'select2-results')]//ul[@class='select2-results__options']/li`).should('be.visible').first().click();
    }

    selectDefaultLocation(locationDropdownIndex: number, locationName: string){
        cy.get('[data-test="locationDropdown"]').eq(locationDropdownIndex).should('exist').click();
        // Select the first result
        cy.xpath('//body/span/span/span[1]/input').should('be.visible').type(locationName).then(()=>{
            cy.wait(1000);
            cy.xpath(`//span[contains(@class,'select2-results')]//ul[@class='select2-results__options']/li`).should('be.visible').first().click();
        });
    }

    enterProgramName(programName:string){
        cy.get('[data-test="programNameTextbox"]')
            .type(programName).type('{enter}');
    }

    enterProgramStartDate(programStartDate:string){
        cy.get('[data-test="startDateTextbox"]')
            .type(programStartDate).type('{enter}');
    }

    clickSaveProgram(){
        cy.intercept('POST', `**/programs*`).as('saveProgram');
        cy.get('[data-test="saveProgramButton"]').should('exist').click();
    }

    checkSaveProgramSuccess() {
        cy.wait('@saveProgram').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            cy.get('ngb-alert > span').contains('The program was created successfully');
        })
    }
}
