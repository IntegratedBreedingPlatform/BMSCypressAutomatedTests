// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
import 'cy-verify-downloads';

require('cy-verify-downloads').addCustomCommand();

Cypress.Commands.add('login', () => {
  cy.visit('ibpworkbench/controller/auth/login');

  cy.intercept('POST', '/ibpworkbench/controller/auth/validateLogin').as('doLogin');

  cy.get('.js-login-username').type(Cypress.env('username'));
  cy.get('.js-login-password').type(Cypress.env('password'));
  cy.get('.js-login-form').submit();

  cy.wait('@doLogin');
})

export function getAccessToken() {
  const token = localStorage.getItem('bms.xAuthToken');
  return JSON.parse(token).token;
}

export function randomString(length = 11) {
    return Math.random().toString(36).substr(2, length);
}

export function getProgramByName(programName: string) {
    return new Cypress.Promise((resolve, reject) => {
        cy.request({
            method: 'GET',
            url: `/bmsapi/${Cypress.env('cropName')}/brapi/v1/programs?programName=${programName}` ,
            headers: {
              'X-Auth-Token': getAccessToken()
            }
          }).its('body').then((body) => {
            resolve(body.result.data[0]);
          });
    });
}

Cypress.Commands.add('getPrograms', () => {

  cy.request({
    method: 'GET',
    url: `/bmsapi/${Cypress.env('cropName')}/brapi/v1/programs` ,
    headers: {
      'X-Auth-Token': getAccessToken()
    }
  }).its('body').then((body) => {
    const program = body.result.data[0];
    Cypress.env('program', { uuid: program.programDbId, name: program.name });
  })

});

// TODO refactor, use getIframeBody? that uses only cypress retry-ability (Cypress "manages a Promise chain on your behalf")
Cypress.Commands.add('waitIframeToLoad', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.on('load', () => {
            resolve($iframe.contents().find('body'));
        });
    });
});

/**
 * Ideally test should be isolated according to cypress best practices
 * but being able to keep localstorage between test allows to stay on the page
 * and run more than than one cucumber scenario without doing the full login loop.
 *
 * See also:
 * https://github.com/cypress-io/cypress/issues/461#issuecomment-392070888
 */
//
const LOCAL_STORAGE_MEMORY: any = {};

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

/**
 * Usage:
 *      getIframeBody().then(($iframe) => {
 *        cy.wrap($iframe)
 *      })
 * or
 *      getIframeBody().find()
 */
export function getIframeBody() {
    // get the main iframe
    // and retry until the body element is not empty
    return cy.get('mat-sidenav-content > iframe', {timeout: Cypress.config('pageLoadTimeout')})
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
}

export function closeReleaseNotePopupIfShown() {
    cy.window().then((window: any) => {
        if (window.showReleaseNotes) {
            cy.get('jhi-release-notes-wrapper > iframe').its('0.contentDocument.body').should('not.be.empty')
                .then(($iframe) => {
                    cy.wrap($iframe).find('jhi-release-notes-dialog > div.modal-footer > button.btn-primary', {
                        timeout: Cypress.config('pageLoadTimeout')
                    }).click();
                });
        }
    });
}

export function closeGermplasmListFeedbackPopupIfShown(shown: boolean) {
    if (shown) {
        getIframeBody().find('#dontShowAgain').should('exist').check();
        getIframeBody().find('jhi-feedback-dialog-component > div.modal-footer > button.btn-primary', {
            timeout: Cypress.config('pageLoadTimeout')
        }).click();

    };
}
