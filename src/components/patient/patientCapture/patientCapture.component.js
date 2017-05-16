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

  patientSelfCaptureController.$inject = [
    'Endpoint', 'Notify',
    'ICON_NOTIFICATION', 'ICON_RGX', 'moment'
  ];
  function patientSelfCaptureController (
    Endpoint, Notify,
    ICON_NOTIFICATION, ICON_RGX, moment
  )
  {

    this.$onInit = ()=> {
      this.getSchoolOrDaycare = Endpoint.getSchoolOrDaycare;
      this.ageInYears = 100;

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

      /* Function Declaration */
      this.onSchoolOrDaycareSelect = onSchoolOrDaycareSelect;
      this.openOiidHintModal = openOiidHintModal;
      this.calculateIfPatientIsOver18 = calculateIfPatientIsOver18;
    };


    /**
     * Open hint for OIID
     */
    function openOiidHintModal() {
      Notify.publish(ICON_NOTIFICATION.INFO_OIID_HINT);
    }


    /**
     * Calculates if the patient is over 18 years of age, to use to display the school or daycare field (If under 18)
     * @param date: Date from datepicker, after it has been selected
     */
    function calculateIfPatientIsOver18(date) {
      let currentDate = new moment();
      let age = new moment(date);
      this.ageInYears = currentDate.diff(age, 'years');
    }

    /**
     * The selected school or daycare needs to have the indentifier value stored for FHIR, so on select it stores this value
     * @memberof patientController
     * @param {Object} selected: The selected school or daycare
     */
    function onSchoolOrDaycareSelect (selected) {
      this.localPatient.schoolOrDayCare = selected.name;
      this.localPatient.schoolOrDayCareIdentifier = selected.identifier;
    }
  }
})();
