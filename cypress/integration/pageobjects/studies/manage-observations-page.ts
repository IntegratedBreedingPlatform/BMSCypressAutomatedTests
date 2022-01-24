import { getIframeBody } from '../../../support/commands';

export default class ManageObservationsPage {

    getObservationValueByDatatype(dataType:string, useValidValue:boolean) {
        // by default, assume numeric trait
        var value = '11.5';
        if (dataType === 'categorical') {
            value = useValidValue? '3' : '8';
        } else if (dataType === 'character') {
            value = 'Sample Notes';
        } else if (dataType === 'date') {
            const d = new Date();
            const month = (d.getMonth() + 1);
            const monthText = month < 10? '0' + month : month;
            value = d.getFullYear().toString() + monthText + d.getDate().toString();
        }
        return value;
    }

    performInlineEdit(traitName:string, dataType:string, traitId:number, useValidValue:boolean) {
        cy.wait('@addTraits').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);

            var row = useValidValue? 1 : 2;
            var cellXpath = this.getCellClassName(traitId, row)
            // Click on trait cell to activate inline edition
            getIframeBody().xpath(cellXpath).click().then(() => {
                var value = this.getObservationValueByDatatype(dataType, useValidValue);

                if (dataType === 'date') {
                    getIframeBody().xpath(`//div[@class="datepicker-days"]/table/tbody/tr/td[contains(@class,'today')]`, {timeout:50000}).click();
                    getIframeBody().xpath(`//th[text()='${traitName}']`).click();

                } else if (dataType === 'categorical') {
                    if (!useValidValue) {
                        getIframeBody().xpath(`//div[@ng-model="observation.value"]//div[contains(@class,'select2-drop-active')]//div[contains(@class,'select2-search')]//input[@type='search']`, {timeout:50000})
                            .type(value + '{enter}', { force: true, delay: 100, timeout:50000});
                    } else {
                        getIframeBody().find('li.ui-select-choices-row > div > div', {timeout:50000}).contains(value).click();
                    }

                } else {
                    getIframeBody().xpath(`//observation-inline-editor/input`).type(value  + '{enter}');
                }
            });
        });
       
    }

    verifyInlineEditSuccessful(dataType:string, traitId:number, row:number) {
        var cellXpath = this.getCellClassName(traitId, row);
        var value = this.getObservationValueByDatatype(dataType, true);
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

    verifyOutOfBoundDataSaved(traitId:number) {
        var cellXpath = this.getCellClassName(traitId, 2);
        var value = this.getObservationValueByDatatype('categorical', false);
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

}