/**
 * Retrieval Service
 * @name RetrievalService
 * @namespace RetrievalService
 */
(function () {
    'use strict';

    angular
        .module('icon.Retrieval', [])
        .service('RetrievalService', RetrievalService);

    RetrievalService.$inject = ['$http', 'ICON_API'];

    /**
     * @desc Retrieval Service to retrieve and parse FHIR object
     * @memberOf RetrievalService
     */
    function RetrievalService($http, ICON_API) {

        var RetrievalService = {};

        /*
        * Service method to retrieve data for a given client id
        * param: clientId client id to use for retrieval
        */
        RetrievalService.requestPatientData = requestPatientData;
        RetrievalService.getDiseaseHeaders = getDiseaseHeaders;

        /**
        * @desc getDiseaseHeaders - Service method to retrieve disease headers in selected language
        * @memberof - RetrievalService
        * @param {object} sessionToken - Authorization session token
        * @param {string} lang - language to use
        * @returns {object}
        */
        function getDiseaseHeaders(sessionToken, lang) {
            return $http.get(ICON_API.DISEASE + lang + '_index?select=SNOMED,ICON_Display&SNOMED=in.397428000,76902006,27836007,398102009,406583002,16814004,186150001,14189004,36989005,36653000,38907003,23511006,66071002,240532009,6142004,40468003', {
                method: "GET",
                headers: {
                    Authorization: sessionToken,
                    "session-token": sessionToken
                }
            }).then(function (response) {
                //console.log(response.data);
                return response.data;
            });
        }

        /**
        * @desc requestData - Service method to retrieve parsed data for a given client
        * @memberof - RetrievalService
        * @param {object} sessionToken - Authorization session token
        * @param {string} clientId - Ontario Immunization ID of person to retrieve
        * @param {string} clientPin - Pin person to retrieve
        * @param {string} lang - language to use
        * @returns {object}
        */
        function requestPatientData(relationshipToPatient, sessionToken, clientId, clientPin, lang) { //: Patient {

            //generate hash of pin
            var clientPinHash = encryptPin(clientPin);

            //send request to server
            return $http.get(ICON_API.YELLOW_CARD, {
                method: "GET",
                headers: {
                    'session-token': sessionToken,
                    'immunizations-context': clientPinHash,
                    'lang': lang,
                    'oiid': clientId
                },
                params: {
                    relationshipToPatient: relationshipToPatient
                }

            }).then(function (result) {
                //return response from server to client
                //console.log('Server returned request with result status: ' + JSON.stringify(result.status));
                return result;
            });
        }

        /**
        * @desc encryptPin - Encrypts user entered pin to SHA256 and encodes as base64 string
        * @memberof - RetrievalService
        * @param {string} userPin - pin to encode
        * @returns {string} - hashed string containing json object with key value pair: {pin:hashedPin}
        */
        function encryptPin(userPin) {
            //envrypt pin with SHA256
            var CryptoJS = require('crypto-js');
            var encryptedPin = CryptoJS.SHA256(userPin);

            //create JSON object containing pin
            var pinObj = { 'pin': encryptedPin.toString() };
            //console.log('pin obj: ' + JSON.stringify(pinObj));

            //convert json object to string
            var stringObj = JSON.stringify(pinObj);

            //return base64 encoded string of json object
            return new Buffer(stringObj).toString('base64');
        }

        return RetrievalService;
    };
})();
