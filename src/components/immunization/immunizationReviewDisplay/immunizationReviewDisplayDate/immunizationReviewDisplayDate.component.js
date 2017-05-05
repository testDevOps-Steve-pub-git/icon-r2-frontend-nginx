/**
 * Created on 2017-05-01.
 * Display component for grouping immunizations by date
 * to be used on the review page
 */
(function() {
'use strict';

  module.exports = {
    templateUrl: './components/immunization/immunizationReviewDisplay/immunizationReviewDisplayDate/immunizationReviewDisplayDate.template.html',
    bindings: {
      patient: '<',
      immunizations: '<'
    },
    controller: immunizationReviewDisplayDateController
  };


  immunizationReviewDisplayDateController.$inject = [];
  function immunizationReviewDisplayDateController() {}

})();
