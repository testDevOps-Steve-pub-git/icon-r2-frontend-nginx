/**
 * Created on 2017-05-18.
 * Component for the school/daycare input for the auth track
 */
/* @ngInject */
function authSchoolDaycare$ctrl (ImmunizationRecordService, ICON_RGX, Endpoint, moment) {
  this.$onInit = () => {
    /* Getting birth date for calculating whether use will see school/daycare inut */
    let patientInfo = ImmunizationRecordService.getPatient()
    this.ageInYears = calculateIfPatientIsOver18(patientInfo.dateOfBirth)

    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx

    /* Function Dec */
    this.onSchoolOrDaycareSelect = onSchoolOrDaycareSelect
    this.calculateIfPatientIsOver18 = calculateIfPatientIsOver18
    this.getSchoolOrDaycare = getSchoolOrDaycare
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
    return currentDate.diff(age, 'years')
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
  name: 'authSchoolDaycare',
  component: {
    bindings: {
      form: '<',
      localPatient: '<'
    },
    templateUrl: './components/patient/authSchoolDaycareCapture/authSchoolDaycareCapture.template.html',
    controller: authSchoolDaycare$ctrl
  }
}
