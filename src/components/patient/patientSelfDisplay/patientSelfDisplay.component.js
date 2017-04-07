/**
 * Created on 2017-01-16.
 * Component for patient self display, for read only patient display
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      clientInfo: '<',
      submitterInfo: '<',
    },
    templateUrl: './components/patient/patientSelfDisplay/patientSelfDisplay.template.html',
    controller: patientSelfDisplayController,
  };

  patientSelfDisplayController.$inject = [];
  function patientSelfDisplayController () {

    /** On function Initialization */
    this.$onInit = ()=> {
      //Set submitter first and last name to clientInfo first and last name
      if(!this.submitterInfo.firstName){ this.submitterInfo.firstName = this.clientInfo.firstName}
      if(!this.submitterInfo.lastName){ this.submitterInfo.lastName = this.clientInfo.lastName}
    }

  }

})();
