/**
 * Function used to collect all objects that will be used in the test requirments including selectors(element ids) modules(helper functions) and sample data sets(user information).
 */
(function() {
'use strict';
  var modules = require('./modules/modules.js');
  var selectors = require('./selectors/selectors.js');
  // Makes all objects visible to the requirements.js file.
  module.exports = {
    fileUploader: modules.file,
    form: modules.form,
    wait: modules.wait,
    global: selectors.global,
    retrieval: selectors.retrieval,
    submission: selectors.submission
  } 
}());
