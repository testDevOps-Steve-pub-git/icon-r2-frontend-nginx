/**
 * Created on 2017-02-24.
 * Component to group together auth patient information where patient is a dependent
 */
(function() {
  'use strict';

   module.exports = {
     bindings: {
       form: '<',
       localPatient: '<',
     },
     templateUrl: './components/patient/authOtherPatientContainer/authOtherPatientContainer.template.html',
     controller: authOtherPatientContainerController,
   };

  authOtherPatientContainerController.$inject = ['ImmunizationRecordService', 'Multitenancy', 'ICON_RGX', 'Endpoint'];
  function authOtherPatientContainerController(ImmunizationRecordService, Multitenancy, ICON_RGX, Endpoint) {

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
        }
      };

      /** School/Daycare lookup */
      this.getSchoolOrDaycare = Endpoint.getSchoolOrDaycare;
    };

  }
})();
