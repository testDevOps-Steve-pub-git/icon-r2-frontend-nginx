/* @ngInject */
function emailConfirmation$ctrl (Multitenancy,
                                      ImmunizationRecordService,
                                      $state) {
  this.$onInit = () => {
    Multitenancy.getPhuKeys()
      .then((phuAssets) => { this.multitenancy = phuAssets })

    this.patientInfo = ImmunizationRecordService.getPatient()
  }
}

export default {
  name: 'emailConfirmation',
  view: {
    controller: emailConfirmation$ctrl,
    template: `
      <h2 translate="emailConfirmation.TITLE"></h2>

      <span translate="emailConfirmation.CONFIRMATION_MESSAGE"
       translate-compile
       translate-values="{
         patient_oiid: $ctrl.patientInfo.oiid,
         phuName: '{{$ctrl.multitenancy.NAME_KEY | translate}}',
         phuPhone: '{{$ctrl.multitenancy.PHONE_KEY | translate}}'
       }">
      </span>

      <a class="icon-btn-link text-left"
      id="returnHomeButton"
      ui-sref="welcome"
      translate="emailConfirmation.RETURN_HOME">
      </a>
    `
  }
}
