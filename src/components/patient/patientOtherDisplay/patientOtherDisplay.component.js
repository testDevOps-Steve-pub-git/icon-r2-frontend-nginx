/**
 * Created on 2017-01-27.
 * Component for patient display when submitter and patient are different
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      clientInfo: '<',
    },
    controller: patientOtherDisplayController,
    templateUrl: './components/patient/patientOtherDisplay/patientOtherDisplay.template.html',
  };

  patientOtherDisplayController.$inject = [];
  function patientOtherDisplayController() {}

})();
