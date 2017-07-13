/* @ngInject */
function welcomeAuthChoice$ctrl (ImmunizationRecordService, $state, $uibModal) {
  this.$onInit = () => {
    this.patientInfo = ImmunizationRecordService.getPatient()

    /* func declaration */
    this.goToPINInput = goToPINInput
    this.openHelpModal = openHelpModal
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
      .catch((error) => { console.log(error) })
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
