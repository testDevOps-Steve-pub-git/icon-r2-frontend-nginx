(function () {
'use strict';

  module.exports = {
    templateUrl: './components/review/submitImmunizations/submitImmunizations.template.html',
    controller: addressToggleController
  };

addressToggleController.$inject = [
  '$q', '$state',
  'ImmunizationRecordService', 'ImmunizationRecordConverter', 'FileUploadHandler', 'Endpoint', 'ToasterChoiceService', 'Notify',
  'ICON_NOTIFICATION'
];
function addressToggleController (
  $q, $state,
  ImmunizationRecordService, ImmunizationRecordConverter, FileUploadHandler, Endpoint, ToasterChoiceService, Notify,
  ICON_NOTIFICATION
) {

  this.$onInit = () => {
    this.isSubmitButtonDisabled = false;

    //Set messages for toaster
    let toasterParams = {
      title: 'It appears there was an error',
      body: 'Check your internet connectivity and try again!'
    };

    let submitImmunizations = () => {

      ImmunizationRecordConverter
          .convert(ImmunizationRecordService)
          .then(Endpoint.submitImmunizationRecord)
          .then((response) => {
            this.isSubmitButtonDisabled = false;
            $state.go('^.confirmation');
          })
          .then(() => { Notify.publish(ICON_NOTIFICATION.POP_SUBMISSION_PROGRESS); })
          .catch((error) => {
            Notify.publish(ICON_NOTIFICATION.POP_SUBMISSION_PROGRESS);
            this.isSubmitButtonDisabled = false;
            ToasterChoiceService.setToasterParams(toasterParams);
            ToasterChoiceService.setToasterChoice('error');
          });
    };

    this.submit = () => {
      this.isSubmitButtonDisabled = true;

      Notify.publish(ICON_NOTIFICATION.PUSH_SUBMISSION_PROGRESS);
      FileUploadHandler
          .getUploader()
          .then((uploader) => {
            if (uploader.queue.length > 0) {
              uploader.onCompleteAll = submitImmunizations;
              uploader.uploadAll();
            }
            else {
              submitImmunizations();
            }
          })
          .catch((error) => {
            console.error(error);
            ToasterChoiceService.setToasterChoice('error');
            this.isSubmitButtonDisabled = false;
          });
    };
  };
  }
}());
