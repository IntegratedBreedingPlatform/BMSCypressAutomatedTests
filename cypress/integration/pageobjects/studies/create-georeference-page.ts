import { getIframeBody } from '../../../support/commands';

export default class CreateGeoreferencePage {

    selectEnvironment() {
        getIframeBody().xpath(`//div[@id='instance-selection']`).should('be.visible');
        getIframeBody().find('[data-test="singleInstanceRadio"]').first().should('be.visible').click();
        cy.intercept('GET', `**/brapi/v2/locations/*`).as('loadMap');
        getIframeBody().find('[data-test="selectInstanceContinueButton"]').first().should('be.visible').click();
    }

    loadDetails() {
        getIframeBody().xpath(`//div[@ng-app='fieldMapApp']`).should('be.visible');
        getIframeBody().xpath(`//div[@ng-app='fieldMapApp']//a[text()='Load']`).should('be.visible').click();
    }

    saveDetails() {
        getIframeBody().xpath(`//div[@ng-app='fieldMapApp']`).should('be.visible');
        getIframeBody().xpath(`//div[@ng-app='fieldMapApp']//a[text()='Save']`).should('be.visible').click();
    }

    drawRectangle() {
        cy.wait('@loadMap').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getMapIframeDocument().xpath(`//a[contains(@title, 'Creates a new rectangle')]`).should('exist').click();
            getMapIframeDocument()
                .trigger("mousedown", 50, 50, {
                    which: 1,
                    force: true
                })
                .trigger("mousemove", 100, 100, {
                    which: 1,
                    force: true
                })
                .trigger("mouseup", 100, 100, {
                    which: 1,
                    force: true
                });
        }); // to adjust coordinates
    }
    plotsUpdatedSuccess() {

    }

}

const getMapIframeDocument = () => {
    return getIframeBody().xpath(`//div[@class='modal-content']//iframe`).then(cy.wrap);
}
