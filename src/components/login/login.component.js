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
    'Endpoint', 'ImmunizationRecordService', 'FhirRecordConverter', 'Multitenancy', 'Notify', 'ToasterChoiceService',
    'ICON_RGX', 'ICON_NOTIFICATION', 'ICON_ERROR'
  ];
  function loginController(
    $state,
    Endpoint, ImmunizationRecordService, FhirRecordConverter, Multitenancy, Notify, ToasterChoiceService,
    ICON_RGX, ICON_NOTIFICATION, ICON_ERROR
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
        Endpoint
        .retrieveImmunizationRecord(this.oiid, this.pin)
        .then(FhirRecordConverter.convert)
        .then(FhirRecordConverter.populateConvertedData)
        .then((retrievedRecord) => {
          ImmunizationRecordService.setPatient(retrievedRecord.patient);
          ImmunizationRecordService.setRetrievedImmunizations(retrievedRecord.retrievedImmunizations);
          ImmunizationRecordService.setRecommendations(retrievedRecord.recommendations);
          return retrievedRecord;
        })
        .then(() => { $state.go('^.patient'); })
        .then(() => { Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS); })
        .catch((error) => {
          switch(error.message){
            case ICON_ERROR.RETRIEVAL.OUTCOME_BAD_OIID:
              Notify.publish(ICON_NOTIFICATION.WARN_RETRIEVAL_BAD_OIID);
              break;
            case ICON_ERROR.RETRIEVAL.OUTCOME_BAD_PIN:
              Notify.publish(ICON_NOTIFICATION.WARN_RETRIEVAL_BAD_PIN);
              break;
            case ICON_ERROR.RETRIEVAL.OUTCOME_CONSENT_BLOCK:
              Notify.publish(ICON_NOTIFICATION.WARN_RETRIEVAL_CONSENT_BLOCK);
              break;
            default:
              Notify.publish(ICON_NOTIFICATION.WARN_RETRIEVAL_UNKNOWN);
              break;
          }

          Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS);
          console.warn(error);
        });
      }
    }
  }

})();
