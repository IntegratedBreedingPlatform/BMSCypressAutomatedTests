import { getIframeBody } from '../../../support/commands';

export default class AssignCodePage{
    openAssignCodeModal(){
        getIframeBody().find('#actionMenu').click();
        getIframeBody().find('[jhitranslate="search-germplasm.actions.code-germplasm"]').click().then(() => {
            getIframeBody().find('.modal-dialog').should('exist');
            getIframeBody().find('jhi-germplasm-coding').should('exist');
        });
    }

    selectCodeLevel(level:String){
       switch (level){
           case 'CODE1' :
                getIframeBody().find('#code1').click();
                break;
           case 'CODE2' :
                getIframeBody().find('#code2').click();
                break;
           case 'CODE3' :
                getIframeBody().find('#code3').click();          
       }           
    }
    selectManualNaming(){
        getIframeBody().find('#manualNaming').click();   
    }

    specifyManualNamingDetails(prefix:string, digits: string, suffix:string, 
        spaceBetweenPrefixCode: boolean, spaceBetweenSuffixCode: boolean, startNumber: string){
        getIframeBody().find('#prefix').type(prefix);   
        getIframeBody().find('[name="numOfDigits"]').should('exist').select(digits, { force : true });
        getIframeBody().find('#suffix').type(suffix);   

        if (spaceBetweenPrefixCode){
           getIframeBody().find('#addSpacePrefixYes').click(); 
        }
        if (spaceBetweenSuffixCode){
            getIframeBody().find('#addSpaceSuffixYes').click(); 
         }
        getIframeBody().find('#startNumber').type(startNumber);   

    }
    selectAutomaticNaming(){
        getIframeBody().find('#automaticNaming').click();
    }
    clickAssignCode(){
        getIframeBody().find('[data-test="applyCodesButton"]').click();
    }

    verifyCodingResults(){
        getIframeBody().find('jhi-germplasm-coding-result-dialog').should('exist')
        cy.wait(100);
        getIframeBody().xpath('//body//jhi-germplasm-coding-result-dialog/div/div[2]/div/table/tbody/tr/td[2]/ul/li').should('exist').contains('successfully assigned name')
        
    }
}
