class BmsApiPage{

    launchBMSAPI(){
        cy.visit('bmsapi');
    }

    verifyPageLoaded() {
        cy.xpath('//h2[contains(text(),"BMSAPI")]', {timeout: 15000}).should('exist');
        cy.xpath('//p[contains(text(),"Try out the Breeding Management System API methods listed below!")]');
        // Check one of the resources
        cy.xpath('//span[contains(text(),"experimental-design-type-resource")]');
    }

}
export default BmsApiPage