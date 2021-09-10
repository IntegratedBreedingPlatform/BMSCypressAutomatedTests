// Prepare folder structure

const fs = require('fs-extra');

const dir = 'cypress/cucumber_report/';

fs.emptyDir('cypress/cucumber_report/', err => {
  if (err) return console.error(err)
  console.log('cypress/cucumber_report folder created')
})

// Report configuration
const reporter = require('cucumber-html-reporter');

const options = {
        theme: 'bootstrap',
        jsonFile: 'cypress/cucumber_json',
        output: 'cypress/cucumber_report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };

    reporter.generate(options);
    