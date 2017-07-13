/* @ngInject */
function patientAddress$ctrl (Endpoint, ImmunizationRecordService, $scope, Utility) {

  this.$onInit = () => {
    this.localAddress = ImmunizationRecordService.getAddress();

    this.validateForm = ({ form }) => {

      if(this.localAddress.postalCode === '') {
        form.$valid = false;
      }

      if (!form.$valid) Utility.focusFirstInvalidField(form)
      else ImmunizationRecordService.setAddress(this.localAddress)

      return form.$valid;
    };
  };
}

export default {
  name: 'patientAddress',
  view: {
    controller: patientAddress$ctrl,
    template: `
      <h2>{{ 'address.ADDRESS_TITLE' | translate }}</h2>

      <form class="form form-container" name="addressCaptureForm" novalidate autocomplete="off">
        <address-toggle
        form="addressCaptureForm"
        local-address="$ctrl.localAddress">
        </address-toggle>

        <!--Error messages for province-->
        <div class="error-messages" id="address-form-error" ng-if="!addressCaptureForm.$valid && !$ctrl.localAddress.postalCode && $ctrl.localAddress.addressType === 'Street'">
          <div class="alert alert-danger col-xs-12"  translate='addressCapture.ERRORS.INCOMPLETE'
               aria-label="addressCapture.ERRORS.INCOMPLETE" role="alert"></div>
        </div>
        <!--End Error Messages-->

        <hr />

        <next-prev-buttons
        on-next="$ctrl.validateForm({ form: addressCaptureForm })">
        </next-prev-buttons>
      </form>
    `
  }
};
