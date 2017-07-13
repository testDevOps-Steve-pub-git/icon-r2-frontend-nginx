/**
 * Created on 2016-09-06.
 * Service for user accepting legal agreement
 */
/* @ngInject */
function AcceptLegalAgreement () {
  var acceptedLegal = false

  return {
    acceptedLegal: acceptedLegal
  }
}

export default {
  name: 'AcceptLegalAgreement',
  service: AcceptLegalAgreement
}
