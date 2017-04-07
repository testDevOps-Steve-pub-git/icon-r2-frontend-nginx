/**
 * Created on 2017-01-27.
 * Component to display submitter information
 */
(function() {
'use strict';

  module.exports = {
    templateUrl: './components/submitter/submitterDisplay/submitterDisplay.template.html',
    bindings: {
      submitterInfo: '<'
    },
    controller: submitterDisplayController
  };

  submitterDisplayController.$inject = [];
  function submitterDisplayController () {}

})();
