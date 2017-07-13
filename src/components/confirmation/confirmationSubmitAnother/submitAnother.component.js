/**
 * Created on 2017-01-24.
 * Component that allows users to make another submission after successfully completing one
 */
/* @ngInject */
function submitAnother$ctrl (
  $state,
  $uibModal,
  ImmunizationRecordService, Notify, TokenHandler, MiscData,
  ICON_NOTIFICATION
) {
  let submitter = {}
  let address = {}
  this.path = ''
  this.$onInit = () => {
    /* If user decides to submit again, they will skip AUP */
    MiscData.setSkipAUP(true)

    /* Func Init */
    this.returnHome = returnHome
    this.openHelpModal = openHelpModal
  }

  this.$onDestroy = () => {
    submitter = ImmunizationRecordService.getSubmitter()
    address = ImmunizationRecordService.getAddress()

    ImmunizationRecordService.clear()

    ImmunizationRecordService.setSubmitter(submitter)
    ImmunizationRecordService.setAddress(address)

    TokenHandler.clearTransactionToken()
  }

  /**
   *  Opens modal window for information on OIID and PIN
   */
  function openHelpModal () {
    $uibModal.open({
      animation: true,
      template: '<welcome-help-modal $close="$close(result)"></welcome-help-modal>',
      controller: () => {},
      size: 'md'
    }).result
      .catch(angular.noop)
  }

  /**
   *  Return user home, clears information, lets user know their information has been cleared, clear session
   */
  function returnHome () {
    ImmunizationRecordService.clear()
    Notify.publish(ICON_NOTIFICATION.INFO_PATIENT_DATA_CLEARED)
    TokenHandler.clearTransactionToken()
    $state.go('welcome')
  }
}

export default {
  name: 'submitAnother',
  component: {
    templateUrl: './components/confirmation/confirmationSubmitAnother/submitAnother.template.html',
    controller: submitAnother$ctrl
  }
}
