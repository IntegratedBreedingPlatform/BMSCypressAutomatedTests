describe('Programs', () => {

	const cropName = Cypress.env('cropName');

	const getProgramsIframeDocument = () => {
    // TODO: use data-test=”unique_value” as selectors
		return cy.get('mat-sidenav-content > iframe').its('0.contentDocument').should('exist');
	}

	const getProgramsIframeBody = () => {
		return getProgramsIframeDocument().its('body').should('not.be.undefined').then(cy.wrap);
	}

	beforeEach(() => {
		cy.login();
		cy.getProgram();
	})

	it('Select program', () => {
		const program = Cypress.env('program');

		cy.visit('ibpworkbench/main/app/#/');

		getProgramsIframeBody().find('#cropDropdown select').should('exist').select(cropName, { force : true });
		getProgramsIframeBody().find('#cropDropdown select').should('have.value', cropName);

		getProgramsIframeBody().find('#programDropdown select').should('exist').select(program.name, { force : true });
		getProgramsIframeBody().find('#programDropdown select').should('have.value', program.uuid);

    // TODO: use data-test=”unique_value” as selectors
		getProgramsIframeBody().find('jhi-program > section > div:nth-child(1) > div.col-sm-4 > form > div:nth-child(2) > div.col-sm-auto > button').should('exist').click().then(() => {

      // TODO: use data-test=”unique_value” as selectors
		  cy.get('jhi-navbar > div > mat-toolbar > span').contains(program.name);
		});
	})

})
