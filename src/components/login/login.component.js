/**
 * Component for oiid and pin login
 *
 */
(function() {
'use strict';

  module.exports = {
    templateUrl: './components/login/login.template.html',
    controller: loginController,
  };

  loginController.$inject = [
    '$state',
    'DhirErrorHandler', 'Endpoint', 'ImmunizationRecordService', 'FhirRecordConverter', 'Multitenancy', 'Notify',
    'ICON_RGX', 'ICON_NOTIFICATION'
  ];
  function loginController(
    $state,
    DhirErrorHandler, Endpoint, ImmunizationRecordService, FhirRecordConverter, Multitenancy, Notify,
    ICON_RGX, ICON_NOTIFICATION
  ) {
    this.$onInit = () => {
      this.oiid = '';
      this.pin = '';
      this.rgx = ICON_RGX.rgx;
      /** Angular mask options oiid */
      this.oiidOptions = {
        maskDefinitions: {
          'A': /[2-9b-df-hj-np-tv-xzB-DF-HJ-NP-TV-XZ]/
        }
      };

      Multitenancy
      .getPhuKeys()
      .then((phuAssets) => { this.multitenancy = phuAssets; });

      this.submit = () => {
        Notify.publish(ICON_NOTIFICATION.PUSH_RETRIEVAL_PROGRESS)
        Endpoint.retrieveImmunizationRecord(this.oiid, this.pin)
        .then(FhirRecordConverter.convert)
        .then(FhirRecordConverter.populateConvertedData)
        .then((retrievedRecord) => {
          ImmunizationRecordService.setPatient(retrievedRecord.patient);
          ImmunizationRecordService.setRetrievedImmunizations(retrievedRecord.retrievedImmunizations);
          ImmunizationRecordService.setRecommendations(retrievedRecord.recommendations);
        })
        .then(() => $state.go('^.patient'))
        .then(() => Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS))
        .catch(DhirErrorHandler.notifyRetrievalError);
      }
    }
  }

})();
