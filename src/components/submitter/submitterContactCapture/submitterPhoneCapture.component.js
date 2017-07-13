/**
 * Created on 2017-02-09.
 * Component for submitter phone capture
 */
/* @ngInject */
function submitterPhone$ctrl (ICON_RGX) {
  this.$onInit = () => {
    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx

    /** Angular mask options phone */
    this.phoneOptions = {
      maskDefinitions: {
        '9': /[0-9]/
      },
      addDefaultPlaceholder: false
    }
  }
}

export default {
  name: 'submitterPhone',
  component: {
    templateUrl: './components/submitter/submitterContactCapture/submitterPhoneCapture.template.html',
    bindings: {
      localSubmitterInfo: '=',
      form: '='
    },
    controller: submitterPhone$ctrl
  }
}
