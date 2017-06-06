/**
 * Created on 2016-09-06.
 * Service for user accepting legal agreement
 */
(function() {
  'use strict'

  module.exports = AcceptLegalAgreement;

  function AcceptLegalAgreement () {
    var acceptedLegal = false;

    return {
      acceptedLegal: acceptedLegal
    };
  }

})();
