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


  immunizationReviewDisplayDateController.$inject = ['ImmunizationRecordService'];
  function immunizationReviewDisplayDateController(ImmunizationRecordService) {

    this.$onInit = ()=> {
      /* If the user edits the DOB to be later than an Imms date, display an error */
      this.invalidDate = ImmunizationRecordService.checkDOBAgainstImmunizationDate(this.patient.dateOfBirth, this.immunizations)
    }
  }

})();
