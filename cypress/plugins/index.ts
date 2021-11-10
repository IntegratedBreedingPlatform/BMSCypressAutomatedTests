// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api

const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');
const mysql = require('mysql')

//const webpack = require("@cypress/webpack-preprocessor");

function queryDB(query, config) {

  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)

  // start connection to db
  connection.connect()

  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })

}

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

  on('task', {
    queryDB: query => {
      return queryDB(query, config)
    }
  })

  // If there is no baseUrl set as config we set the one that is defined as env variable (check cypress.env.json)
  if (!config.baseUrl) {
    config.baseUrl = config.env.baseUrl;
  }

  return config;
  


}
