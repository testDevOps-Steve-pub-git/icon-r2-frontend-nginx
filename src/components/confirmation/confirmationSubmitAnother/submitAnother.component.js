/**
 * Created on 2017-01-24.
 * Component that allows users to make another submission after successfully completing one
 */
(function(){
'use strict';

  module.exports = {
    templateUrl: './components/confirmation/confirmationSubmitAnother/submitAnother.template.html',
    controller: submitAnotherController,
  };

  submitAnotherController.$inject = [
    '$state',
    '$uibModal',
    'ImmunizationRecordService', 'Notify', 'ToasterChoiceService', 'TokenHandler',
    'ICON_NOTIFICATION'
  ];
  function submitAnotherController (
    $state,
    $uibModal,
    ImmunizationRecordService, Notify, ToasterChoiceService, TokenHandler,
    ICON_NOTIFICATION
  ) {
    let $ctrl = this;
    let submitterInfo = {};
    this.$onInit = () => {
      $ctrl.openCompletionSubmitterModal = openCompletionSubmitterModal;
      $ctrl.submitter = {value:'ONESELF'};
      submitterInfo = ImmunizationRecordService.getSubmitter();
      $ctrl.returnHome = returnHome;
    };


    /**
     *  Return user home, clears information, lets user know their information has been cleared, clear session
     */
    function returnHome () {
      ImmunizationRecordService.clear();
      // ToasterChoiceService.setToasterChoice('clear');
      Notify.publish(ICON_NOTIFICATION.INFO_PATIENT_DATA_CLEARED);
      TokenHandler.clearTransactionToken();
      $state.go('welcome');
    }


    function openCompletionSubmitterModal (type) {
      let address = '';
      if (type == 'auth') {
        address = ImmunizationRecordService.getAddress();
      }
      ImmunizationRecordService.clear();
      $uibModal.open({
          animation : true,
          template : `<welcome-modal modal-data='$ctrl.submitter' $close="$close(result)"></welcome-modal>`,
          controller: ['modalData', function(modalData) {
            let ctrl = this;
            ctrl.modalData = modalData;
          }],
          backdrop  : 'static',
          resolve: {
            modalData: $ctrl.submitter
          },
          size: 'sm',
        }).result
          .then((submitter) => {
            $ctrl.submitter.value = submitter;
            submitterInfo.relationshipToPatient = $ctrl.submitter.value;
            //Set submitterInfo model to update relationshipToPatient
            ImmunizationRecordService.setSubmitter(submitterInfo);
            if (type == 'auth') {
              ImmunizationRecordService.setAddress(address);
            if ($ctrl.submitter.value == 'ONESELF') {
              $state.go('auth.self.login')
            } else {
              $state.go('auth.other.login');
            }
          } else {
            if ($ctrl.submitter.value == 'ONESELF') {
              $state.go('anon.self.submission.patient')
            } else {
              $state.go('anon.other.submission.patient');
            }
          }
          }, function (reason) {
            console.info(`Reason for dismissal is: ${reason}`);
          });
      };
    }
}());
