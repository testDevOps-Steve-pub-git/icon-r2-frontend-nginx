/**
 * @namespace icon.test.e2e.modules 
 */
(function() {
'use strict';
  module.exports = {
    file: require('./fileUploader.js'),
    form: require('./formPopulators.js'),
    wait: require('./waitForElements.js')
  }
}());
