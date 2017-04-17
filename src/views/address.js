addressController.$inject = ['Endpoint', 'ImmunizationRecordService', '$scope']
function addressController (Endpoint, ImmunizationRecordService, $scope) {

  this.$onInit = () => {
    this.localAddress = ImmunizationRecordService.getAddress();

    this.validateForm = ({ form }) => {

      if(this.localAddress.postalCode === '') {
        form.$valid = false;
      }

      if (!form.$valid && form.$error.required) form.$error.required
        .forEach((field) => { field.$setTouched(); });
      else ImmunizationRecordService.setAddress(this.localAddress);
      return form.$valid;

    };
  };
}

module.exports = {
  controller: addressController,
  template: `
    <h2>{{ 'address.ADDRESS_TITLE' | translate }}</h2>

    <form class="form form-container" name="addressCaptureForm" novalidate autocomplete="off">
      <address-toggle
      form="addressCaptureForm"
      local-address="$ctrl.localAddress">
      </address-toggle>

      <hr />

      <next-prev-buttons
      on-next="$ctrl.validateForm({ form: addressCaptureForm })">
      </next-prev-buttons>
    </form>
  `
};
