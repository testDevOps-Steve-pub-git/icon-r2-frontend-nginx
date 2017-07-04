anonImmunizationsController.$inject = [];
function anonImmunizationsController () {}

module.exports = {
  controller: anonImmunizationsController,
  template: `
  <h1>{{ 'immunizationInput.IMMUNIZATIONS' | translate }}</h1>
  <form class="form form-container" name="anonImmunizationForm" novalidate autocomplete="off">
    <immunization-gating></immunization-gating>
  </form>

  `
};
