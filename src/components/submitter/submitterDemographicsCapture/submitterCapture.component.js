/**
 * Created on 2017-01-24.
 * Component for submitter demographic capture
 */
/* @ngInject */
function submitterCapture$ctrl (ICON_RGX) {
  this.$onInit = () => {
    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx
  }
}

export default {
  name: 'submitterDemographicCapture',
  component: {
    templateUrl: './components/submitter/submitterDemographicsCapture/submitterCapture.template.html',
    bindings: {
      localSubmitterInfo: '=',
      form: '='
    },
    controller: submitterCapture$ctrl
  }
}
