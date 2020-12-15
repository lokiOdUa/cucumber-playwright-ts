const reporter = require('cucumber-html-reporter')

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.cucumber',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': 'x.y.z',
    'Test Environment': 'STAGING',
    'Browser': 'Chrome 78',
    'Platform': 'Linux',
    'Parallel': 'Scenarios',
    'Executed': 'Remote'
  }
}

reporter.generate(options)
