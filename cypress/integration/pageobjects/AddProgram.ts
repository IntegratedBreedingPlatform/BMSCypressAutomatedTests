class AddProgram{

    enterCropName(cropName:string){
        return cy.get('.v-filterselect-input').type(cropName)
    }

    enterProgramName(programName:string){
        return cy.get('.v-textfield v-textfield-hide-caption hide-caption v-textfield-error v-textfield-required').type(programName)
    }

    clickSaveProgram(){
        return cy.get('#saveProjectButton').should('exist').click();
    }

    checkSaveProgramSuccess(){
        return cy.get('.popupContent').should('have.value','Success');
    }
}

export default AddProgram