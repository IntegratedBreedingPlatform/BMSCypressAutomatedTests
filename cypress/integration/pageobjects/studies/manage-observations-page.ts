import { getIframeBody } from '../../../support/commands';

export default class ManageObservationsPage {

    performInlineEdit(traitName:string, dataType:string, traitId:number, value:string, row:number) {
        cy.wait('@addTraits').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().xpath(`//th[text()='${traitName}']`).should('exist');

            var cellXpath = this.getCellClassName(traitId, row)
            // Click on trait cell to activate inline edition
            getIframeBody().xpath(cellXpath).click().then(() => {
                if (dataType === 'date') {
                    getIframeBody().xpath(`//observation-inline-editor/input`, {timeout: 150000}).should('exist').then(() => {
                        getIframeBody().xpath(`//observation-inline-editor/input`).clear().type(value  + '{enter}');
                        getIframeBody().xpath(`//th[text()='${traitName}']`).click();
                    });
                } else if (dataType === 'categorical') {
                    getIframeBody().xpath(`//div[@ng-model="observation.value"]//div[contains(@class,'select2-drop-active')]//div[contains(@class,'select2-search')]//input[@type='search']`, {timeout:50000})
                        .type(value + '{enter}', { force: true, delay: 100, timeout:50000});
                    getIframeBody().xpath(`//div[@ng-model="observation.value"]//div[contains(@class,'select2-drop-active')]//div[contains(@class,'select2-search')]//input[@type='search']`, {timeout:50000})
                        .type('{enter}', { force: true, delay: 100, timeout:50000});
                } else {
                    getIframeBody().xpath(`//observation-inline-editor/input`).type(value  + '{enter}');
                }
            });
        });
       
    }

    verifyInlineEditSuccessful(dataType:string, traitId:number, row:number, value:string) {
        var cellXpath = this.getCellClassName(traitId, row);
        if (dataType !== 'categorical') {
            getIframeBody().xpath(cellXpath).should('have.text', value);
        } else {
            var xpath = cellXpath + `/span[@class='fbk-measurement-categorical-name']`;
            getIframeBody().xpath(xpath, {timeout:100000}).should('have.text', value);
        }
    }

    keepOutOfBoundData() {
        getIframeBody().xpath(`//button[text()='Keep']`, {timeout:150000}).should('be.visible').click();
    }

    discardOutOfBoundData() {
        getIframeBody().xpath(`//button[text()='Discard']`, {timeout:150000}).should('be.visible').click();
    }

    verifyOutOfBoundDataSaved(value:string, traitId:number) {
        var cellXpath = this.getCellClassName(traitId, 2);
        getIframeBody().xpath(cellXpath).should('have.text', value).should('have.class', 'accepted-value');
    }

    verifyDataNotSaved(traitId:number) {
        var cellXpath = this.getCellClassName(traitId, 2);
        getIframeBody().xpath(cellXpath).should('have.text', '');
    }

    getCellClassName(traitId:number, row:number) {
        var className = 'termId-' + traitId;
        return `//table/tbody/tr[${row}]/td[contains(@class,'${className}')]`;
    }

    addTraitObservations(observationName: string) {
        cy.wait('@addTraits').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            this.setVariableValues(observationName);
        });
    }

    setVariableValues(observationName: string) {
        getIframeBody().find('[data-test="toggleBatchActionButton"]').should('be.visible').click();
        getIframeBody().find('[data-test="selectVariable"]').should('be.visible').click();
        getIframeBody().find(`[title='${observationName}']`).should('be.visible').click();
        getIframeBody().find('[data-test="selectAction"]').should('be.visible').click();
        getIframeBody().find('[title="Apply new value to observations"]').should('be.visible').click();
        // Only works for numeric trait
        getIframeBody().find('input[data-test="newValueInput"]').should('be.visible').type('3');
        getIframeBody().find('[data-test="applyBatchActionButton"]').should('be.visible').click();
        getIframeBody().find('button[ng-bind="confirmButtonLabel"]').should('be.visible').click();
    }

}
