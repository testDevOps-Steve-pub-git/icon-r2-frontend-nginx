/**
 * Created on 2016-12-19.
 * Component for patient information for track- Anonymous, Submitting for Self
 * Bindings:
 *    localPatient: object to store patient information until next button, which will bind to the model
 *    form: Parent form to validate against
 */
/* @ngInject */
function patientSelfCapture$ctrl (
  Endpoint, Notify,
  ICON_NOTIFICATION, ICON_RGX, moment,
  ImmunizationRecordService,
  Patient
) {
  this.$onInit = () => {
    this.rgx = ICON_RGX.rgx
    this.genders = Patient.genders

    /** Angular mask options hcn */
    this.hcnOptions = {
      maskDefinitions: {
        'A': /[0-9]/
      },
      addDefaultPlaceholder: false
    }

    /* Function Declaration */
    this.onSchoolOrDaycareSelect = onSchoolOrDaycareSelect
    this.calculateIfPatientIsOver18 = calculateIfPatientIsOver18
    this.calculateIfPatientIsOver18(this.localPatient.dateOfBirth)
    this.getSchoolOrDaycare = getSchoolOrDaycare
  }

  this.$onDestroy = () => {
    if (this.ageInYears >= 18) {
      this.localPatient.schoolOrDayCare = ''
      ImmunizationRecordService.setPatient(this.localPatient)
    }
  }

  /**
   * For school or daycare query. If user enters invalid character do not do query
   * @param schoolQuery: Query user types
   * Returns schools
   */
  function getSchoolOrDaycare (schoolQuery) {
    return Endpoint.getSchoolOrDaycare(schoolQuery)
      .then((res) => {
        return res
      })
  }

  /**
   * Calculates if the patient is over 18 years of age, to use to display the school or daycare field (If under 18)
   * @param date: Date from datepicker, after it has been selected
   */
  function calculateIfPatientIsOver18 (date) {
    let currentDate = new moment()
    let age = new moment(date)
    this.ageInYears = currentDate.diff(age, 'years')
  }

  /**
   * The selected school or daycare needs to have the indentifier value stored for FHIR, so on select it stores this value
   * @memberof patientController
   * @param {Object} selected: The selected school or daycare
   */
  function onSchoolOrDaycareSelect (selected) {
    this.localPatient.schoolOrDayCare = selected.name
    this.localPatient.schoolOrDayCareIdentifier = selected.identifier
  }
}

export default {
  name: 'patientCapture',
  component: {
    bindings: {
      localPatient: '=',
      localSubmitterInfo: '=',
      form: '='
    },
    templateUrl: './components/patient/patientCapture/patientCapture.template.html',
    controller: patientSelfCapture$ctrl
  }
}
