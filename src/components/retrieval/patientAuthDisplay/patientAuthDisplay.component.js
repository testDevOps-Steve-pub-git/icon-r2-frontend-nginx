/**
 * Created on 2017-01-27.
 * Component for patient display when submitter and patient are different
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      clientInfo: '<',
      page: '@',
    },
    templateUrl: './components/retrieval/patientAuthDisplay/patientAuthDisplay.template.html',
    controller: patientAuthDisplayController,
  };

  patientAuthDisplayController.$inject = ['ImmunizationRecordService'];
  function patientAuthDisplayController(ImmunizationRecordService) {
    this.patient = ImmunizationRecordService.getPatient();
  }

})();
