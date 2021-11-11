export default class CreateStudyPage {

    clickTab(tab: string) {
        getMainIframeDocument().xpath(`//ul[@id='manage-trial-tab-headers']//li/a[text()='${tab}']`).should('be.visible').click();
    }

    clickStudyAction(actionName: string, actionOptionsName?: string) {
        getMainIframeDocument().xpath(`//span[@name='action-buttons']`).should('be.visible').click();
        if (actionOptionsName) {
            getMainIframeDocument().xpath(`//li/a[text()='${actionOptionsName}']`).should('be.visible').realHover();
        }
        getMainIframeDocument().xpath(`//li/a[text()='${actionName}']`).should('be.visible').click();
    }

    enterStudyName(studyName: string) {
        return getMainIframeDocument().get('input[ng-model="data.studyName"]').should('exist').type(studyName)
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
        getMainIframeDocument().xpath(`//section-container[contains(@heading,'CHOOSE A DESIGN TYPE')]//div[contains(@class,'select2-container')]`).should('be.visible').click();
        getMainIframeDocument().xpath(`//div[contains(@class,'select2-result-label') and contains(text(),'Randomized Complete Block Design')]`).should('be.visible').click();
        getMainIframeDocument().xpath(`//input[@id='txtStartingPlotNo']`).should('be.visible').clear().type('1', { delay: 0 });
        getMainIframeDocument().xpath(`//input[@name='replicationsCount']`).should('be.visible').clear().type('2', { delay: 0 });
        getMainIframeDocument().xpath(`//input[@type='submit' and @value='${generateDesignLabel}']`).should('be.visible').click();
    }

    confirmGenerateModal() {
        // Wait for modal to load and click the Generate button
        cy.intercept('POST', `**/generation`).as('generate');
        getMainIframeDocument().xpath(`//div[contains(@class,'modal-dialog')]//label[text()='${generateDesignLabel}']`, { timeout: 15000 }).should('be.visible');
        getMainIframeDocument().xpath(`//div[contains(@class,'modal-dialog')]//button[text()='Generate']`).should('be.visible').click();
    }

    checkGenerateDesignSuccess() {
        cy.wait('@generate').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            getMainIframeDocument().xpath(`//div[@id='notification-container']//h1[text()='Success']`).should('be.visible');
        });
    }

    checkGenerateDesignFailure() {
        getMainIframeDocument().xpath(`//div[@id='notification-container']//h1[text()='Error']`).should('be.visible');
    }

    deleteGeneratedDesign() {
        getMainIframeDocumentWaitLoad().xpath(`//ul[@id='manage-trial-tab-headers']//li/a[text()='${experimentalDesignLabel}']`).should('be.visible').click().then(() => {
            getMainIframeDocument().xpath(`//input[@type='button' and @value='Delete Design']`).should('be.visible').first().click({ force: true });
            getMainIframeDocument().xpath(`//div[contains(@class,'modal-dialog')]//div[contains(@class,'modal-footer')]//button[text()='Yes']`).should('be.visible').first().click();
        });
    }

    saveStudyWithBasicDetails(studyName: string, studyDesc: string, studyType: string, objective: string) {
        getMainIframeDocumentWaitLoad().xpath('//input[@ng-model="data.studyName"]').type(studyName, { delay: 0 });
        getMainIframeDocument().xpath('//input[@ng-model="data.description"]').type(studyDesc, { delay: 0 });
        getMainIframeDocument().xpath('//select[@id="studyTypeId"]').select(studyType, { force: true });
        getMainIframeDocument().xpath('//textarea[@ng-model="data.objective"]').type(objective, { delay: 0 });
        this.openChangeFolderModal();
        getMainIframeDocument().xpath(`//input[@value='Save']`).click();
    }

    openChangeFolderModal() {
        getMainIframeDocument().xpath(`//a[text()='Change Folder']`).click();
        getMainIframeDocument().xpath('//div[@id=\'studyTreeModal\']//label[text()=\'Browse Studies\']').should('be.visible');
        getMainIframeDocument().xpath(`//a[@class='dynatree-title' and text()='Studies']`).should('be.visible').click({ force: true });
        getMainIframeDocument().xpath(`//div[@id='studyTreeModal']//button[text()='Select']`).click({ force: true });
    }

    addStudySettings() {
        getMainIframeDocumentWaitLoad().xpath(`//div[@id='manage-study-tabs']//span[text()='Add']`).should('be.visible').click();
        this.manageSettingsModal('Add Study-Level Settings', 'PI_NAME');
        getMainIframeDocument().xpath(`//input[@value='Save']`).should('be.visible').click();
    }

    addGermplasms() {
        getMainIframeDocumentWaitLoad();
        this.clickTab('Germplasm & Checks');
        getMainIframeDocument().xpath(`//div[@id='chooseGermplasmAndChecks']//a[text()='Browse']`).should('be.visible').click();
        getMainIframeDocument().xpath(`//div[@id='listTreeModal']//label[text()='Browse For Lists']`).should('be.visible');
        // Wait for the list table to load
        // Click the first germplasm list item in the table
        getMainIframeDocument().xpath(`//div[@id='listTreeModal']//table[@id='treeTable']//tr[contains(@class,'leaf')][1]`).should('exist').click();
        getMainIframeDocument().xpath(`//div[@id='listTreeModal']//button[text()='Select']`).should('be.visible').click();
    }

    addTreatmentFactors() {
        this.clickTab('Treatment Factors');
        getMainIframeDocument().xpath(`//div[@id='manage-study-tabs']//div[@class='in collapse']//span[text()='Add']`).should('be.visible').click();
        this.manageSettingsModal('Add a Treatment Factor', 'NFert_kg_ha');
        this.specifyTreatmentLabelAndSize('NFert_kg_ha', 'NFERT_NO', '2');
        this.specifyTreatmentValue('NFERT_NO 1', '1');
        this.specifyTreatmentValue('NFERT_NO 2', '2');
    }

    specifyTreatmentLabelAndSize = (treatmentFactor: string, treatmentLabel: string, treatmentSize: string) => {
        getMainIframeDocument().xpath(`//a[text()='${treatmentFactor}']//parent::td//parent::tr//div[contains(@class, 'select2-container')]`).should('be.visible').click();
        // Select the first result
        getMainIframeDocument().xpath(`//div[contains(@class,'select2-result-label') and text()='${treatmentLabel}']`).click();
        getMainIframeDocument().xpath(`//a[text()='${treatmentFactor}']//parent::td//parent::tr//td[4]/input`).clear().type(treatmentSize, { delay: 0 });
    }

    specifyTreatmentValue = (treatmentLabelNo: string, value: string) => {
        getMainIframeDocument().xpath(`//a[normalize-space(text())='${treatmentLabelNo}']//parent::td/parent::tr//input[@type='text']`).should('be.visible').type(value, { delay: 0 });
    }

    addEnvironmentVariables() {
        this.clickTab('Environments');
        getMainIframeDocument().xpath(`//div[@id='manage-study-tabs']//section-container[@heading='ENVIRONMENT DETAILS']//span[text()='Add']`).should('be.visible').click();
        this.manageSettingsModal('Add Study-Level Settings', 'Crop_season_Code');
        getMainIframeDocument().xpath(`//div[@id='manage-study-tabs']//section-container[@heading='ENVIRONMENTAL CONDITIONS']//span[text()='Add']`).should('be.visible').click();
        this.manageSettingsModal('Add Environmental Conditions', 'SITE_SOIL_PH');
    }

    manageSettingsModal(headerName: string, variableName: string) {
        getMainIframeDocument().xpath(`//h4[contains(text(), '${headerName}')]`, { timeout: 15000 }).should('be.visible');
        // Trigger variable search dropdown
        getMainIframeDocument().xpath(`//body/div[3]/div/div/div[7]/div/div/div/div/div/div[2]/div[1]/div/a`).should('be.visible').click();
        // Search variable name
        getMainIframeDocument().xpath(`//div[@class='select2-search']//input`).should('be.visible').type(variableName, { force: true, delay: 0 });
        // Select the first result
        getMainIframeDocument().xpath(`//div[contains(@class,'select2-with-searchbox')]//ul[@class='select2-results']/li`).should('be.visible').click();
        // Add the item from result
        getMainIframeDocument().xpath(`//span[text()='${variableName}']/parent::span/parent::span//span[contains(text(), 'Add')]`).click();
        // Close the modal
        getMainIframeDocument().xpath(`//button[contains(text(), 'Close')]`).should('be.visible').click();
    }

    waitForStudyToLoad() {
        getMainIframeDocumentWaitLoad().xpath(`//span[@class='fbk-study-heading']`).should('be.visible');
    }

    selectFielmapLocations() {
        getMainIframeDocument().xpath(`//div[@id='selectTrialInstanceModal']`).should('be.visible');
        getMainIframeDocument().xpath(`//div[@id='selectTrialInstanceModal']//button[text()='OK']`).should('be.visible').click();
    }
}

const generateDesignLabel = 'Generate Design';

const experimentalDesignLabel = 'Experimental Design';

const getMainIframeDocument = () => {
    return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist').its('body').should('not.be.undefined').then(cy.wrap);
}

const getMainIframeDocumentWaitLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}
