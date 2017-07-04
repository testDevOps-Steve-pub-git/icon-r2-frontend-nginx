(function () {
'use strict';

    var Address     = require('./Address.model.js')();
    var Patient     = require('./Patient.model.js')();
    var SessionData = require('./SessionData.model.js')();
    var Submitter   = require('./Submitter.model.js')();

    module.exports = function () { return ImmunizationRecordSubmission; };

    /**
    * @param {Submitter} [submitter=Submitter] - submitter demopgraphic information
    * @param {Patient} [client=Patient] - patient demographic information
    * @param {Address} [address=Address] - patient address information
    * @param {Array<Immunization>} [retrievedImmunizations=Array] - array of immunizations retrieved from Panorama (Yellow Card)
    * @param {Array<Immunization>} [newImmunizations=Array] - array of new immunizations being submitted to ICON by user
    * @param {SessionData} [sessionData=SessionData] - session data
    * @param {Array<Disease>} [recommendations=Array] - array of diseases it is recommended for the user to be immunized against
    * @constructor
    * @returns {ImmunizationRecordSubmission}
    */
    function ImmunizationRecordSubmission (
        submitter,
        client,
        address,
        retrievedImmunizations,
        newImmunizations,
        sessionData,
        recommendations
    ) {
        this.submitter = submitter || new Submitter();
        this.client = client || new Patient();
        this.address = address || new Address();
        this.retrievedImmunizations = retrievedImmunizations || [];
        this.newImmunizations = newImmunizations || [];
        this.sessionData = sessionData || new SessionData();
        this.recommendations = recommendations || [];

        this.clone = clone;

        /**
         * Creates a deep clone of this object.
         * @memberof ImmunizationRecordSubmission
         * @returns {ImmunizationRecordSubmission}
         */
        function clone () {
            return new ImmunizationRecordSubmission(
                this.submitter.clone(),
                this.client.clone(),
                this.address.clone(),
                this.retrievedImmunizations.map(c => c.clone()),
                this.newImmunizations.map(c => c.clone()),
                this.sessionData.clone(),
                this.recommendations.map(c => c.clone())
            );
        }
    }

}());
