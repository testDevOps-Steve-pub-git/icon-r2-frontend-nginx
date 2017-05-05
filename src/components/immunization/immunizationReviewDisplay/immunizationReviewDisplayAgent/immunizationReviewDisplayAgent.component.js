/**
 * Created on 2017-05-01.
 * Display component for grouping immunizations by agent
 * to be used on the review page
 */
(function() {
'use strict';

  module.exports = {
    templateUrl: './components/immunization/immunizationReviewDisplay/immunizationReviewDisplayAgent/immunizationReviewDisplayAgent.template.html',
    bindings: {
      patient: '<',
      immunizations: '<'
    },
    controller: immunizationReviewDisplayAgentController
  };


  immunizationReviewDisplayAgentController.$inject = [];
  function immunizationReviewDisplayAgentController() {}

})();
