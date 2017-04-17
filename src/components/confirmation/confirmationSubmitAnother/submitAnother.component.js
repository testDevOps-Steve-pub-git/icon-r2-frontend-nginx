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
    'ImmunizationRecordService', 'Notify', 'TokenHandler', 'MiscData',
    'ICON_NOTIFICATION'
  ];
  function submitAnotherController (
    $state,
    $uibModal,
    ImmunizationRecordService, Notify, TokenHandler, MiscData,
    ICON_NOTIFICATION
  ) {
    let submitter = {};
    let address = {};
    this.path = '';
    this.$onInit = () => {
      submitter = ImmunizationRecordService.getSubmitter();
      address = ImmunizationRecordService.getAddress();


      /* Saves address and submitter info in case of future submissions. Will get cleared on welcome screen*/
      ImmunizationRecordService.setSubmitter(submitter);
      ImmunizationRecordService.setAddress(address);

      /* If user decides to submit again, they will skip AUP*/
      MiscData.setSkipAUP(true);

      /* Func Init */
      this.returnHome = returnHome;
      this.openHelpModal = openHelpModal;
    };

    this.$onDestroy = ()=> {
      ImmunizationRecordService.clear();
    };


    /**
     *  Opens modal window for information on OIID and PIN
     */
    function openHelpModal () {
      var modalInstance = $uibModal.open({
        animation: true,
        template: '<welcome-help-modal $close="$close(result)"></welcome-help-modal>',
        controller: () => {},
        size: 'md',
      }).result
        .catch((error)=>{});
    }

    /**
     *  Return user home, clears information, lets user know their information has been cleared, clear session
     */
    function returnHome () {
      ImmunizationRecordService.clear();
      Notify.publish(ICON_NOTIFICATION.INFO_PATIENT_DATA_CLEARED);
      TokenHandler.clearTransactionToken();
      $state.go('welcome');
    }
  }
}());
