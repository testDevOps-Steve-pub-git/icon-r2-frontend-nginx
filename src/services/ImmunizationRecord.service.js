/**
* Service to return a singleton model for immunization record.
*/

/* @ngInject */
function ImmunizationRecordService (moment, ImmunizationRecordSubmission) {
/* Private members ************************************************************/

  var immunizationRecordSubmission = new ImmunizationRecordSubmission()

    /* Utility lambda for cloenable children, to be used as argument to map() **/
  let cloneChild = (child) => { return child.clone() }

/* Public methods *************************************************************/

    /**
    * Getter for client
    * @returns {Patient} - client information
    */
  function getPatient () {
    return immunizationRecordSubmission.client.clone()
  }

    /**
    * Sets Immunization Record client info
    * @param {Patient} client - client info to set
    */
  function setPatient (client) {
    immunizationRecordSubmission.client = client.clone()
  }

    /**
     * Getter for submitter
     * @returns {Submitter} - submitter information
     */
  function getSubmitter () {
    return immunizationRecordSubmission.submitter.clone()
  }

    /**
     * Sets Immunization Record submitter info
     * @param {Submitter} submitter - submitter info to set
     */
  function setSubmitter (submitter) {
    immunizationRecordSubmission.submitter = submitter.clone()
  }

    /**
     * Getter for address
     * @returns {Address} - client address information
     */
  function getAddress () {
    return immunizationRecordSubmission.address.clone()
  }

    /**
     * Sets address info
     * @param {Address} address - address info to set
     */
  function setAddress (address) {
    immunizationRecordSubmission.address = address.clone()
  }

    /**
    * Getter for new immunizations
    * @returns {Array<ImmunizationGroup>} - collection of new immunizations
    */
  function getNewImmunizations () {
    return immunizationRecordSubmission.newImmunizations.map(cloneChild)
  }

    /**
     * Sets new immunizations
     * @param {Array<ImmunizationGroup>} newImmunizations - collection of new immunizations
     */
  function setNewImmunizations (newImmunizations) {
    immunizationRecordSubmission.newImmunizations = newImmunizations.map(cloneChild)
  }

    /**
    * Gets retrieved immunizations
    * @returns {Array<ImmunizationGroup>} - collection of retrieved immunizations
    */
  function getRetrievedImmunizations () {
    return immunizationRecordSubmission.retrievedImmunizations.map(cloneChild)
  }

    /**
     * Sets retrieved immunizations.
     * @param {Array<ImmunizationGroup>} retrievedImmunizations - collection of retrieved immunizations
     */
  function setRetrievedImmunizations (retrievedImmunizations) {
    immunizationRecordSubmission.retrievedImmunizations = retrievedImmunizations.map(cloneChild)
  }

  function getRecommendations () {
    return immunizationRecordSubmission.recommendations.map(cloneChild)
  }

  function setRecommendations (recommendations) {
    immunizationRecordSubmission.recommendations = recommendations.map(cloneChild)
  }

    /**
    * Clears the current immunizations from the model
    */
  function clear () {
    immunizationRecordSubmission = new ImmunizationRecordSubmission()
  }

  /**
   * Function to check the user date of birth against the immunization dates. This is used to make sure that when
   * the user edits their DOB they do not change the DOB to a date after an immunization date
   * @param patientDateOfBirth: Patient date of birth
   * @param immunizations: Array of patient's immunizations
   * @returns {boolean}: True if there is an invalid date, false if no invalid date (Invalid date being a DOB later than an Imms date)
   */
  function checkDOBAgainstImmunizationDate (patientDOB, immunizations) {
    let invalidDate = false
    let patientDateOfBirth = moment(patientDOB)
    immunizations.forEach((immunization) => {
      if (moment(immunization.date).isBefore(patientDateOfBirth)) { invalidDate = true }
    })

    return invalidDate
  }

/* Public interface to this service *******************************************/

  return {
    getPatient: getPatient,
    setPatient: setPatient,

    getSubmitter: getSubmitter,
    setSubmitter: setSubmitter,

    getAddress: getAddress,
    setAddress: setAddress,

    getNewImmunizations: getNewImmunizations,
    setNewImmunizations: setNewImmunizations,

    getRetrievedImmunizations: getRetrievedImmunizations,
    setRetrievedImmunizations: setRetrievedImmunizations,

    getRecommendations: getRecommendations,
    setRecommendations: setRecommendations,

    clear: clear,
    checkDOBAgainstImmunizationDate: checkDOBAgainstImmunizationDate
  }
}

export default {
  name: 'ImmunizationRecordService',
  service: ImmunizationRecordService
}
