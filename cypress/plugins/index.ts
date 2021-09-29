// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api

const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');
//const webpack = require("@cypress/webpack-preprocessor");

module.exports = (on, config) => {

  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };
  on('file:preprocessor', cucumber(options));
  
  // const options = {
  //   webpackOptions: require("../webpack.config.js")
  // };
  // on("file:preprocessor", webpack(options));

  // If there is no baseUrl set as config we set the one that is defined as env variable (check cypress.env.json)
  if (!config.baseUrl) {
    config.baseUrl = config.env.baseUrl;
  }

  return config;
  


}
