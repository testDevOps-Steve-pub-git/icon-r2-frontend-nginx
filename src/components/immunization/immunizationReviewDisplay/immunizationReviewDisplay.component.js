/**
 * Created on 2017-02-16.
 * Component for immunization display used on review page
 */
(function() {
'use strict';

  module.exports = {
    templateUrl: './components/immunization/immunizationReviewDisplay/immunizationReviewDisplay.template.html',
    bindings: {
      patient: '<',
      immunizations: '<'
    },
    controller: immunizationReviewDisplayController
  };

  function immunizationReviewDisplayController() {}
})();
