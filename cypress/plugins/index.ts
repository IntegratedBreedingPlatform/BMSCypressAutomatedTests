// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api

import { generateImportCrossesTestData, generateImportLotsData, generateImportGermplasmUpdates, generateImportGermplasmData, generateImportLotUpdateData, generateImportLotAttributesData } from './tasks/excel-data-generator';

const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');
const { isFileExist } = require('cy-verify-downloads');

module.exports = (on, config) => {

  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };
  
  on('file:preprocessor', cucumber(options));
  on('task', {isFileExist, generateImportCrossesTestData});
  on('task', {isFileExist, generateImportLotsData});
  on('task', {isFileExist, generateImportLotUpdateData});
  on('task', {isFileExist, generateImportLotAttributesData});
  on('task', {isFileExist, generateImportGermplasmUpdates});
  on('task', {isFileExist, generateImportGermplasmData});
  // If there is no baseUrl set as config we set the one that is defined as env variable (check cypress.env.json)
  if (!config.baseUrl) {
    config.baseUrl = config.env.baseUrl;
  }

  return config;
  
}


