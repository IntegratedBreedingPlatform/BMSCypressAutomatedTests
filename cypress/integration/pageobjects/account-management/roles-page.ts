import { randomString, getIframeBody } from '../../../support/commands';

export default class RolesPage{
    selectRolesTab() {
        getMainIframeDocumentWaitToLoad().find('ol.nav-tabs  > li > a', {timeout: 50000}).contains('Roles').should('exist').click();
    }

    openCreateRoleModal() {
        getIframeBody().find('div.om-panel-content > a').contains('Create role').should('exist').click();
    }

    createRole(roleType: string) {
        getIframeBody().find('h4.modal-title').contains('Create Role').should('be.visible');
        getIframeBody().find('#roleName')
            .type(id  + " - " + roleType);
        getIframeBody().find('#description')
            .type("Cypress testing-generated role with type " + roleType);
        getIframeBody().find('#roleType')
            .select(roleType);
    }

    selectAllPermissions() {
        getIframeBody().find('ul.ul-tree-level-zero input[type="checkbox"]').check().should('be.checked');
        this.saveNewRole();
    }

    saveNewRole() {
        cy.intercept('POST', `/bmsapi/roles*`).as('addRole');
        getIframeBody().find('div.modal-footer > button').contains('Add Role').should('be.visible').click();
    }

    checkAddRoleSuccess() {
        cy.intercept('POST', `/bmsapi/roles/search*`).as('searchRoles');
        cy.wait('@addRole').then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 201]);
            getIframeBody().find('#default-notification h1').contains('Success').should('be.visible');
        });
    }

    checkNewRoleExists(roleType: string) {
        cy.wait('@searchRoles').then((interception) => {
            expect(interception.response.statusCode).to.be.equal(200);
            const respBody = interception.response.body;
            var newRoleExists = false;

            expect(respBody.length).to.be.greaterThan(0);
            for(var i=0; i < respBody.length; i++) {
                if(respBody[i]["name"] == id  + " - " + roleType) {
                    newRoleExists = true;
                }
            }
            expect(newRoleExists).to.be.true;
        });
    }
}

const getMainIframeDocumentWaitToLoad = () => {
    return cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(cy.wrap);
}

const id = randomString(5);
