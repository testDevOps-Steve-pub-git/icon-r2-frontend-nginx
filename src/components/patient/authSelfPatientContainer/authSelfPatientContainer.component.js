/**
 * Created on 2017-02-24.
 * Component to group together auth self patient components, for the auth self patient view
 */
/* @ngInject */
function authSelfPatientContainer$ctrl (Multitenancy, ICON_RGX) {
  this.$onInit = () => {
    /** Multitenancy Init */
    Multitenancy
      .getPhuKeys()
      .then((phuAssets) => { this.multitenancy = phuAssets })

    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx

    /** Angular mask options hcn */
    this.hcnOptions = {
      maskDefinitions: {
        'A': /[0-9]/
      },
      addDefaultPlaceholder: false
    }
  }
}

export default {
  name: 'authSelfPatientContainer',
  component: {
    bindings: {
      form: '<',
      localPatient: '<',
      localSubmitter: '<'
    },
    templateUrl: './components/patient/authSelfPatientContainer/authSelfPatientContainer.template.html',
    controller: authSelfPatientContainer$ctrl
  }
}
