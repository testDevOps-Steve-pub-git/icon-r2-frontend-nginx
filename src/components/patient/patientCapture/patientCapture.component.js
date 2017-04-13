/**
 * Created on 2016-12-19.
 * Component for patient information for track- Anonymous, Submitting for Self
 * Bindings:
 *    localPatient: object to store patient information until next button, which will bind to the model
 *    form: Parent form to validate against
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      localPatient: '=',
      localSubmitterInfo: '=',
      form: '=',
    },
    templateUrl: './components/patient/patientCapture/patientCapture.template.html',
    controller: patientSelfCaptureController,
  };

  patientSelfCaptureController.$inject = ['ICON_RGX', 'Endpoint'];
  function patientSelfCaptureController (ICON_RGX, Endpoint) {
    this.getSchoolOrDaycare = Endpoint.getSchoolOrDaycare;
    this.onSchoolOrDaycareSelect = onSchoolOrDaycareSelect;

    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx;

    /** Angular mask options oiid */
    this.oiidOptions = {
      maskDefinitions: {
        'A': /[2-9b-df-hj-np-tv-xzB-DF-HJ-NP-TV-XZ]/
      },
      addDefaultPlaceholder:false
    };

    /** Angular mask options hcn */
    this.hcnOptions = {
      maskDefinitions: {
        'A': /[0-9]/
      },
      addDefaultPlaceholder:false
    };

    /**
     * The selected school or daycare needs to have the indentifier value stored for FHIR, so on select it stores this value
     * @memberof patientController
     * @param {Object} selected: The selected school or daycare
     */
    function onSchoolOrDaycareSelect (selected) {
      this.localPatient.schoolOrDayCare = selected.name;
      this.localPatient.schoolOrDayCareIdentifier = selected.identifierValue;
    }
  }
})();
