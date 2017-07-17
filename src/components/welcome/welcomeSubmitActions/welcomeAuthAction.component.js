/* @ngInject */
function welcomeAuthChoice$ctrl (ImmunizationRecordService, $state, $uibModal, Notify, ICON_NOTIFICATION) {
  this.$onInit = () => {
    this.patientInfo = ImmunizationRecordService.getPatient()

    /* func declaration */
    this.goToPINInput = goToPINInput
    this.openHelpModal = () => Notify.publish(ICON_NOTIFICATION.INFO_LEARN_MORE_ABOUT_OIID)
  }

  /**
   * Check to make sure user has entered valid oiid, if so go to pin entry screen
   * @param form: the state of the form the oiid input is in
   */
  function goToPINInput (form) {
    if (form.$valid) {
      // TODO: Routing params
      ImmunizationRecordService.setPatient(this.patientInfo)
      $state.go('verification.enter-pin', { action: 'SUBMISSION' })
    } else {
      form.OIID.$setTouched()
    }
  }
}

export default {
  name: 'welcomeAuthAction',
  component: {
    templateUrl: './components/welcome/welcomeSubmitActions/welcomeAuthAction.template.html',
    bindings: {},
    controller: welcomeAuthChoice$ctrl
  }
}
