// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api

module.exports = (on, config) => {

  // If there is no baseUrl set as config we set the one that is defined as env variable (check cypress.env.json)
  if (!config.baseUrl) {
    config.baseUrl = config.env.baseUrl;
  }

  return config;
}
