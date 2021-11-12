export default class CreateFieldmapPage {

    addFieldName(fieldName: string) {
        getMainIframeDocument().xpath(`//a[text()='Add Fields']`).should('be.visible').click();
        getMainIframeDocument().xpath(`//div[@id='addFieldsModal']`).should('be.visible');
        getMainIframeDocument().xpath(`//input[@id='newFieldName']`).should('be.visible').clear().type(fieldName, { delay: 0 });
        getMainIframeDocument().xpath(`//div[@id='addFieldsModal']//button[@id='addFields']`).should('be.visible').click();

    }

    addBlockName(blockName: string) {
        getMainIframeDocument().xpath(`//a[text()='Add Blocks']`).should('be.visible').click();
        getMainIframeDocument().xpath(`//div[@id='addBlocksModal']`).should('be.visible');
        getMainIframeDocument().xpath(`//input[@id='newBlockName']`).should('be.visible').clear().type(blockName, { delay: 0 });
        getMainIframeDocument().xpath(`//div[@id='addBlocksModal']//button[@id='addFields']`).should('be.visible').click();
    }

    specifyNumberOfRowsAndRanges() {
        // Get the total number of plots displayed from the page
        getMainIframeDocument().xpath(`//label[text()='Total Number of Plots']/following-sibling::span`).then(($span: any) => {
            return $span.text();
        }).then((totalNumberOfPlots: string) => {
            getMainIframeDocument().xpath(`//input[@id='userFieldmap.numberOfRangesInBlock']`).should('be.visible').clear().type(Number(totalNumberOfPlots)/2, { delay: 0 });
            getMainIframeDocument().xpath(`//input[@id='userFieldmap.numberOfRowsInBlock']`).should('be.visible').clear().type(2, { delay: 0 });
        });
    }

    specifyPlotLayoutOrder(value: string) {
        getMainIframeDocument().xpath(`(//input[@name='userFieldmap.plantingOrder'])[1]`).should('be.visible').click();
    }

    waitForFieldmapPageToLoad() {
        getMainIframeDocumentWaitLoad().xpath(`//h1/span[text()='FIELD PLAN']`).should('be.visible');
    }

    moveToPlantingDetailsPage() {
        // Check if the current active page is '1. ENTER FIELD DETAILS'.
        getMainIframeDocument().xpath(`//h2[text()='1. ENTER FIELD DETAILS' and not(contains(@class, 'light'))]`).should('exist');
        getMainIframeDocument().xpath(`//input[@value='Next']`).should('be.visible').click();
    }

    moveToGenerateFieldmapPage() {
         // Check if the current active page is '2. ENTER PLANTING DETAILS'.
        getMainIframeDocument().xpath(`//h2[text()='2. ENTER PLANTING DETAILS' and not(contains(@class, 'light'))]`).should('exist');
        getMainIframeDocument().xpath(`//input[@value='Next']`).should('be.visible').click();
    }

    clickFinish() {
        getMainIframeDocument().xpath(`//input[@value='Finish']`).should('be.visible').click();
    }

}

const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}

const getMainIframeDocumentWaitLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}