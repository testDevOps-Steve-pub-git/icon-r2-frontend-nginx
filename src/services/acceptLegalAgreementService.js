/**
 * Created on 2016-09-06.
 * Service for user accepting legal agreement
 */
(function() {
  'use strict'
  angular
    .module('icon.acceptLegalAgreementService', [])
    .factory('acceptLegalAgreement', acceptLegalAgreement);

  acceptLegalAgreement.$inject = [];
  function acceptLegalAgreement() {

    var acceptedLegal = false;

    return {
      acceptedLegal: acceptedLegal
    };
  }

})();
