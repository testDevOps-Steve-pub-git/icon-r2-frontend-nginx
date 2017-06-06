(function () {
'use strict';

  module.exports = {
    templateUrl: './components/review/submitImmunizations/submitImmunizations.template.html',
    controller: addressToggleController
  };

addressToggleController.$inject = [
  '$q', '$state',
  'ImmunizationRecordService', 'ImmunizationRecordConverter', 'FileUploadHandler', 'Endpoint', 'Notify',
  'ICON_NOTIFICATION'
];
function addressToggleController (
  $q, $state,
  ImmunizationRecordService, ImmunizationRecordConverter, FileUploadHandler, Endpoint, Notify,
  ICON_NOTIFICATION
) {

  this.$onInit = () => {
    this.isSubmitButtonDisabled = false;

    /* If the user edits the DOB to be later than an Imms date, display an error */
    let patientInfo = ImmunizationRecordService.getPatient();
    let immunizations = ImmunizationRecordService.getNewImmunizations();
    this.invalidDate = ImmunizationRecordService.checkDOBAgainstImmunizationDate(patientInfo.dateOfBirth, immunizations);

    let submitImmunizations = () => {

      ImmunizationRecordConverter
          .convert(ImmunizationRecordService)
          .then(Endpoint.submitImmunizationRecord)
          .then(() => { Notify.publish(ICON_NOTIFICATION.POP_SUBMISSION_PROGRESS); })
          .then((response) => {
            this.isSubmitButtonDisabled = false;
            $state.go('^.confirmation');
          })
          .catch((error) => {
            console.warn(error);
            Notify.publish(ICON_NOTIFICATION.POP_SUBMISSION_PROGRESS);
            Notify.publish(ICON_NOTIFICATION.WARN_SUBMISSION_UNKNOWN);
            this.isSubmitButtonDisabled = false;
          });
    };

    this.submit = () => {
      if(this.invalidDate) {
        Notify.publish(ICON_NOTIFICATION.INVALID_DATE_ERROR);
      }
      else {
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
            this.isSubmitButtonDisabled = false;
          });
      }
    };
  };
  }
}());
