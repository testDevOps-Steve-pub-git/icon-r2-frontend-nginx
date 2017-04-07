/**
* Service to return a singleton model for immunization record.
*/
(function () {
'use strict';
  let ImmunizationRecordSubmission = require('../models/ImmunizationRecordSubmission.model.js')();
  module.exports = ImmunizationRecordService;

  function ImmunizationRecordService () {

/* Private members ************************************************************/

      var immunizationRecordSubmission = new ImmunizationRecordSubmission();

      /* Utility lambda for cloenable children, to be used as argument to map() **/
      let cloneChild = (child) => { return child.clone(); }


/* Public methods *************************************************************/

      /**
      * Getter for client
      * @returns {Patient} - client information
      */
      function getPatient () {
        return immunizationRecordSubmission.client.clone();
      }

      /**
      * Sets Immunization Record client info
      * @param {Patient} client - client info to set
      */
      function setPatient (client) {
        immunizationRecordSubmission.client = client.clone();
      }

      /**
       * Getter for submitter
       * @returns {Submitter} - submitter information
       */
      function getSubmitter () {
        return immunizationRecordSubmission.submitter.clone();
      }

      /**
       * Sets Immunization Record submitter info
       * @param {Submitter} submitter - submitter info to set
       */
      function setSubmitter (submitter) {
        immunizationRecordSubmission.submitter = submitter.clone();
      }

      /**
       * Getter for address
       * @returns {Address} - client address information
       */
      function getAddress () {
        return immunizationRecordSubmission.address.clone();
      }

      /**
       * Sets address info
       * @param {Address} address - address info to set
       */
      function setAddress (address) {
        immunizationRecordSubmission.address = address.clone();
      }

      /**
       * Gets sessionData from immunization record
       * @returns {SessionData} - session tracking data
       */
      function getSessionData () {
        return immunizationRecordSubmission.sessionData.clone();
      }

      /**
       * Sets session data for immunization record
       * @param {SessionData} sessionData - current session data
       */
      function setSessionData (sessionData) {
        immunizationRecordSubmission.sessionData = sessionData.clone();
      }

      /**
      * Getter for new immunizations
      * @returns {Array<ImmunizationGroup>} - collection of new immunizations
      */
      function getNewImmunizations () {
        return immunizationRecordSubmission.newImmunizations.map(cloneChild);
      }

      /**
       * Sets new immunizations
       * @param {Array<ImmunizationGroup>} newImmunizations - collection of new immunizations
       */
      function setNewImmunizations (newImmunizations) {
        immunizationRecordSubmission.newImmunizations = newImmunizations.map(cloneChild);
      }

      /**
      * Gets retrieved immunizations
      * @returns {Array<ImmunizationGroup>} - collection of retrieved immunizations
      */
      function getRetrievedImmunizations () {
          return immunizationRecordSubmission.retrievedImmunizations.map(cloneChild);
      }

      /**
       * Sets retrieved immunizations.
       * @param {Array<ImmunizationGroup>} retrievedImmunizations - collection of retrieved immunizations
       */
      function setRetrievedImmunizations (retrievedImmunizations) {
          immunizationRecordSubmission.retrievedImmunizations = retrievedImmunizations.map(cloneChild);
      }

      function getRecommendations () {
        return immunizationRecordSubmission.recommendations.map(cloneChild);
      }

      function setRecommendations (recommendations) {
        immunizationRecordSubmission.recommendations = recommendations.map(cloneChild);
      }

      /**
      * Clears the current immunizations from the model
      */
      function clear () {
        immunizationRecordSubmission = new ImmunizationRecordSubmission();
      }

/* Public interface to this service *******************************************/

      return {
          getPatient: getPatient,
          setPatient: setPatient,

          getSubmitter: getSubmitter,
          setSubmitter: setSubmitter,

          getAddress: getAddress,
          setAddress: setAddress,

          getSessionData: getSessionData,
          setSessionData: setSessionData,

          getNewImmunizations: getNewImmunizations,
          setNewImmunizations: setNewImmunizations,

          getRetrievedImmunizations: getRetrievedImmunizations,
          setRetrievedImmunizations: setRetrievedImmunizations,

          getRecommendations: getRecommendations,
          setRecommendations: setRecommendations,

          clear: clear
      };
  }


}());
