/**
 * Created on 2017-01-03.
 * Component for submitter contact information - containing phone number/email
 * Bindings:
 *    LocalSubmiterInfo: local submitter object to store information until next page
 *    form: parent form passed in for validation purposes
 */
/* @ngInject */
function submitterContactCapture$ctrl (ICON_RGX) {
  /** on component initializiation */
  this.$onInit = () => {
    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx
  }
}

export default {
  name: 'submitterEmail',
  component: {
    templateUrl: './components/submitter/submitterContactCapture/submitterContactEmail.template.html',
    bindings: {
      localSubmitterInfo: '=',
      form: '='
    },
    controller: submitterContactCapture$ctrl
  }
}
