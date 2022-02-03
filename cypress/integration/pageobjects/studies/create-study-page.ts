import { getIframeBody } from '../../../support/commands';

export default class CreateStudyPage {

    clickTab(tab: string) {
        getIframeBody().xpath(`//ul[@id='manage-trial-tab-headers']//li/a[text()='${tab}']`).should('be.visible').click();
    }

    clickStudyAction(actionName: string, actionOptionsName?: string) {
        getIframeBody().xpath(`//span[@name='action-buttons']`).should('be.visible').click();
        if (actionOptionsName) {
            getIframeBody().xpath(`//li/a[text()='${actionOptionsName}']`).should('be.visible').realHover();
        }
        getIframeBody().xpath(`//li/a[text()='${actionName}']`).should('be.visible').click();
    }

    enterStudyName(studyName: string) {
        return getIframeBody().get('input[ng-model="data.studyName"]').should('exist').type(studyName)
    }

    goToExperimentalDesign(waitForIframe: boolean) {
        if (waitForIframe) {
            getMainIframeDocumentWaitLoad();
            this.clickTab(experimentalDesignLabel);
        } else {
            this.clickTab(experimentalDesignLabel);
        }
    }

    generateRCBDesign() {
        getIframeBody().xpath(`//section-container[contains(@heading,'CHOOSE A DESIGN TYPE')]//div[contains(@class,'select2-container')]`).should('be.visible').click();
        getIframeBody().xpath(`//div[contains(@class,'select2-result-label') and contains(text(),'Randomized Complete Block Design')]`).should('be.visible').click();
        getIframeBody().xpath(`//input[@id='txtStartingPlotNo']`).should('be.visible').clear().type('1', { delay: 0 });
        getIframeBody().xpath(`//input[@name='replicationsCount']`).should('be.visible').clear().type('2', { delay: 0 });
        getIframeBody().xpath(`//input[@type='submit' and @value='${generateDesignLabel}']`).should('be.visible').click();
    }

    confirmGenerateModal() {
        // Wait for modal to load and click the Generate button
        cy.intercept('POST', `**/generation`).as('generate');
        getIframeBody().xpath(`//div[contains(@class,'modal-dialog')]//label[text()='${generateDesignLabel}']`, { timeout: 15000 }).should('be.visible');
        getIframeBody().xpath(`//div[contains(@class,'modal-dialog')]//button[text()='Generate']`).should('be.visible').click();
    }

    checkGenerateDesignSuccess() {
        cy.wait('@generate').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().xpath(`//div[@id='notification-container']//h1[text()='Success']`).should('be.visible');
        });
    }

    checkGenerateDesignFailure() {
        getIframeBody().xpath(`//div[@id='notification-container']//h1[text()='Error']`).should('be.visible');
    }

    deleteGeneratedDesign() {
        getMainIframeDocumentWaitLoad().xpath(`//ul[@id='manage-trial-tab-headers']//li/a[text()='${experimentalDesignLabel}']`).should('be.visible').click().then(() => {
            getIframeBody().xpath(`//input[@type='button' and @value='Delete Design']`).should('be.visible').first().click({ force: true });
            getIframeBody().xpath(`//div[contains(@class,'modal-dialog')]//div[contains(@class,'modal-footer')]//button[text()='Yes']`).should('be.visible').first().click();
        });
    }

    saveStudyWithBasicDetails(studyName: string, studyDesc: string, studyType: string, objective: string) {
        getMainIframeDocumentWaitLoad().xpath('//input[@ng-model="data.studyName"]').type(studyName, { delay: 0 });
        getIframeBody().xpath('//input[@ng-model="data.description"]').type(studyDesc, { delay: 0 });
        getIframeBody().xpath('//select[@id="studyTypeId"]').select(studyType, { force: true });
        getIframeBody().xpath('//textarea[@ng-model="data.objective"]').type(objective, { delay: 0 });
        this.openChangeFolderModal();
        getIframeBody().xpath(`//input[@value='Save']`).click();
    }

    openChangeFolderModal() {
        getIframeBody().xpath(`//a[text()='Change Folder']`).click();
        getIframeBody().xpath('//div[@id=\'studyTreeModal\']//label[text()=\'Browse Studies\']').should('be.visible');
        getIframeBody().xpath(`//a[@class='dynatree-title' and text()='Studies']`).should('be.visible').click({ force: true });
        getIframeBody().xpath(`//div[@id='studyTreeModal']//button[text()='Select']`).click({ force: true });
    }

    addStudySettings() {
        getMainIframeDocumentWaitLoad().xpath(`//div[@id='manage-study-tabs']//span[text()='Add']`).should('be.visible').click();
        this.manageSettingsModal('Add Study-Level Settings', 'PI_NAME');
        getIframeBody().xpath(`//input[@value='Save']`).should('be.visible').click();
    }

    addGermplasms() {
        getMainIframeDocumentWaitLoad();
        this.clickTab('Germplasm & Checks');
        getIframeBody().xpath(`//div[@id='chooseGermplasmAndChecks']//a[text()='Browse']`).should('be.visible').click();
        getIframeBody().xpath(`//div[@id='listTreeModal']//label[text()='Browse For Lists']`).should('be.visible');
        // Wait for the list table to load
        // Click the first germplasm list item in the table
        getIframeBody().xpath(`//div[@id='listTreeModal']//table[@id='treeTable']//tr[contains(@class,'leaf')][1]`).should('exist').click();
        getIframeBody().xpath(`//div[@id='listTreeModal']//button[text()='Select']`).should('be.visible').click();
    }

    addTreatmentFactors() {
        this.clickTab('Treatment Factors');
        getIframeBody().xpath(`//div[@id='manage-study-tabs']//div[@class='in collapse']//span[text()='Add']`).should('be.visible').click();
        this.manageSettingsModal('Add a Treatment Factor', 'NFert_kg_ha');
        this.specifyTreatmentLabelAndSize('NFert_kg_ha', 'NFERT_NO', '2');
        this.specifyTreatmentValue('NFERT_NO 1', '1');
        this.specifyTreatmentValue('NFERT_NO 2', '2');
    }

    specifyTreatmentLabelAndSize = (treatmentFactor: string, treatmentLabel: string, treatmentSize: string) => {
        getIframeBody().xpath(`//a[text()='${treatmentFactor}']//parent::td//parent::tr//div[contains(@class, 'select2-container')]`).should('be.visible').click();
        // Select the first result
        getIframeBody().xpath(`//div[contains(@class,'select2-result-label') and text()='${treatmentLabel}']`).click();
        getIframeBody().xpath(`//a[text()='${treatmentFactor}']//parent::td//parent::tr//td[4]/input`).clear().type(treatmentSize, { delay: 0 });
    }

    specifyTreatmentValue = (treatmentLabelNo: string, value: string) => {
        getIframeBody().xpath(`//a[normalize-space(text())='${treatmentLabelNo}']//parent::td/parent::tr//input[@type='text']`).should('be.visible').type(value, { delay: 0 });
    }

    addEnvironmentVariables() {
        this.clickTab('Environments');
        getIframeBody().xpath(`//div[@id='manage-study-tabs']//section-container[@heading='ENVIRONMENT DETAILS']//span[text()='Add']`).should('be.visible').click();
        this.manageSettingsModal('Add Study-Level Settings', 'Crop_season_Code');
        getIframeBody().xpath(`//div[@id='manage-study-tabs']//section-container[@heading='ENVIRONMENTAL CONDITIONS']//span[text()='Add']`).should('be.visible').click();
        this.manageSettingsModal('Add Environmental Conditions', 'SITE_SOIL_PH');
    }

    manageSettingsModal(headerName: string, variableName: string) {
        getIframeBody().xpath(`//h4[contains(text(), '${headerName}')]`, { timeout: 15000 }).should('be.visible');
        // Trigger variable search dropdown
        getIframeBody().xpath(`//body/div[3]/div/div/div[7]/div/div/div/div/div/div[2]/div[1]/div/a`).should('be.visible').click();
        // Search variable name
        getIframeBody().xpath(`//div[@class='select2-search']//input`).should('be.visible').type(variableName, { force: true, delay: 0 });
        // Select the first result
        getIframeBody().xpath(`//div[contains(@class,'select2-with-searchbox')]//ul[@class='select2-results']/li`).should('be.visible').click();
        // Add the item from result
        getIframeBody().xpath(`//span[text()='${variableName}']/parent::span/parent::span//span[contains(text(), 'Add')]`).click();
        // Close the modal
        getIframeBody().xpath(`//button[contains(text(), 'Close')]`).should('be.visible').click();
    }

    waitForStudyToLoad() {
        getMainIframeDocumentWaitLoad().xpath(`//span[@class='fbk-study-heading']`).should('be.visible');
    }

    selectFielmapLocations() {
        getIframeBody().xpath(`//div[@id='selectTrialInstanceModal']`, { timeout: 15000 }).should('be.visible');
        getIframeBody().xpath(`//div[@id='selectTrialInstanceModal']//button[text()='OK']`).should('be.visible').click();
    }

    verifyColumnsInObservationTable(columnNames: string[] = []) {
        this.clickTab('Observations');
        for (let columnName of columnNames) {
            getIframeBody().xpath(`//th[text()='${columnName}']`).should('be.visible');
        }
    }

    startNewStudyWithObservations (studyName: string, studyDesc: string, studyType: string, objective: string, observationName: string) {
        this.saveStudyWithBasicDetails(studyName, studyDesc, studyType, objective);
        this.addStudySettings();
        this.addGermplasms();
        this.goToExperimentalDesign(false);
        this.generateRCBDesign();
        this.confirmGenerateModal();
        this.checkGenerateDesignSuccess();
        this.goToObservations();
        this.addObservations(observationName);
    }

    goToObservations() {
        getMainIframeDocumentWaitLoad();
        this.clickTab('Observations');
    }

    addObservations(observationName: string) {
        getIframeBody().xpath(`//div[@id='manage-study-tabs']//section-container[@heading='TRAITS']//span[text()='Add']`).should('be.visible').click();
        cy.intercept('POST', `**/observationUnits/table?*`).as('addTraits');
        this.manageSettingsModal('Add Traits', observationName);

        cy.wait('@addTraits').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getIframeBody().xpath(`//th[text()='${observationName}']`).should('be.visible');
            this.setVariableValues(observationName);
        });
    }

    setVariableValues(observationName: string) {
        getIframeBody().find('[data-test="toggleBatchActionButton"]').should('be.visible').click();
        getIframeBody().find('[data-test="selectVariable"]').should('be.visible').click();
        getIframeBody().find(`[title='${observationName}']`).should('be.visible').click();
        getIframeBody().find('[data-test="selectAction"]').should('be.visible').click();
        getIframeBody().find('[title="Apply new value to observations"]').should('be.visible').click();
        getIframeBody().find('input[data-test="newValueInput"]').should('be.visible').type('3');
        getIframeBody().find('[data-test="applyBatchActionButton"]').should('be.visible').click();
        getIframeBody().find('button[ng-bind="confirmButtonLabel"]').should('be.visible').click();
    }
}

const generateDesignLabel = 'Generate Design';

const experimentalDesignLabel = 'Experimental Design';

const getMainIframeDocumentWaitLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}
