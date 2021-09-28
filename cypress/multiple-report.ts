// Prepare folder structure

const fs = require('fs-extra');

const dir = 'cypress/cucumber_report/';

fs.emptyDir('cypress/cucumber_report/', err => {
  if (err) return console.error(err)
  console.log('cypress/cucumber_report folder created')
})

// Report configuration
const report = require('multiple-cucumber-html-reporter');
report.generate({
    jsonDir: './cypress/cucumber_json/',
    reportPath: './cypress/cucumber_report/',
    metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'BMSCypressAutomation'},
            {label: 'Release', value: '19.0'},
            {label: 'Cycle', value: 'Cycle1'},
            {label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
        ]
    }
});

