authImmunizationsController.$inject = [];
function authImmunizationsController () {
    this.attribute = '';
}

module.exports = {
  bindings: { data: '<' },
  controller: authImmunizationsController,
  template: `
    <h1>{{ 'immunizationInput.IMMUNIZATIONS' | translate }}</h1>
    <form class="form form-container" name="authImmunizationForm" novalidate autocomplete="off">
      <immunization-gating></immunization-gating>
    </form>
  `
};
