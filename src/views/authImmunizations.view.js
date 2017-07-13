/* @ngInject */
function authImmunizations$ctrl () {
    this.attribute = '';
}

export default {
  name: 'authImmunizations',
  view: {
    bindings: { data: '<' },
    controller: authImmunizations$ctrl,
    template: `
      <h1>{{ 'immunizationInput.IMMUNIZATIONS' | translate }}</h1>
      <form class="form form-container" name="authImmunizationForm" novalidate autocomplete="off">
        <immunization-gating></immunization-gating>
      </form>
    `
  }
}
