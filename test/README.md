# ICON Automated Test Suite


### End-To-End (E2E) Tests

A suite of automated E2E tests which verify the front-end application works for submission and retrieval of immunization records.


Before you start for the first time:

- open a command-line terminal (PowerShell on Windows)
- navigate to the "client" sub-folder of the source code
- ```> npm install -g protractor```
- ```> webdriver-manager update```
- ```> webdriver-manager start```


To run the e2e test suite:

- ```> npm run test-e2e```
- results output to ```client/test/icon-e2e-test-report.json```


### Unit Tests

A suite of automated unit tests which verify the front-end application business logic.


Before you start for the first time:

- open a command-line terminal (PowerShell on Windows)
- navigate to the "client" sub-folder of the source code
- ```> npm install -g mocha```


To run the unit test suite:

- ```> npm run test-unit```
- results output to ```client/test/icon-unit-test-report.json```


To run the unit test suite in watcher / daemon mode:

- ```> npm run test-unit-watch```
- results output automatically to CLI after save


### All Tests

Before you start for the first time:

- follow the "Before you start..." instructions from both E2E and Unit test sections above


To run the test suite:

- ```> npm test```
- E2E test results output to ```client/test/icon-e2e-test-report.json```
- unit test results output to ```client/test/icon-unit-test-report.json```
