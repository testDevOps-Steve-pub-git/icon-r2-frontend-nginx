/**
 * Created on 2017-02-24.
 * Component to group together auth self patient components, for the auth self patient view
 */
(function() {
'use strict';

  module.exports = {
    bindings: {
      form: '<',
      localPatient: '<',
      localSubmitter: '<',
    },
    templateUrl: './components/patient/authSelfPatientContainer/authSelfPatientContainer.template.html',
    controller: authSelfPatientContainerController,
  };

  authSelfPatientContainerController.$inject = ['ImmunizationRecordService', 'Multitenancy', 'ICON_RGX', 'Endpoint'];
  function authSelfPatientContainerController(ImmunizationRecordService, Multitenancy, ICON_RGX, Endpoint) {

    this.$onInit = ()=> {
      /** Multitenancy Init */
      Multitenancy
        .getPhuKeys()
        .then((phuAssets) => { this.multitenancy = phuAssets; });

      /** Regex Librariess */
      this.rgx = ICON_RGX.rgx;

      /** Angular mask options hcn */
      this.hcnOptions = {
        maskDefinitions: {
          'A': /[0-9]/
        },
        addDefaultPlaceholder:false
      };

      /** School/Daycare lookup */
      this.getSchoolOrDaycare = Endpoint.getSchoolOrDaycare;
    };
  }
})();
