/* @ngInject */
function emailCaptureController (ICON_RGX) {
  /** on component initializiation */
  this.$onInit = () => {
    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx

    this.showConfirm = this.emailConfirm !== undefined
  }
}

export default {
  name: 'emailCapture',
  component: {
    templateUrl: './components/form/emailCapture/emailCapture.template.html',
    bindings: {
      email: '=',
      emailConfirm: '=?',
      form: '=',
      isOptional: '<'
    },
    transclude: {
      'label': '?label',
      'hint': '?hint'
    },
    controller: emailCaptureController
  }
}
