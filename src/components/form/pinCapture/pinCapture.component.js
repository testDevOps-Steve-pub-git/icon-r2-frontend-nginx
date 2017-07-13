/* @ngInject */
function pinCaptureController (ICON_RGX) {
  /** on component initializiation */
  this.$onInit = () => {
    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx

    this.showConfirm = this.pinConfirm !== undefined
  }
}

export default {
  name: 'pinCapture',
  component: {
    templateUrl: './components/form/pinCapture/pinCapture.template.html',
    bindings: {
      pin: '=',
      pinConfirm: '=?',
      form: '='
    },
    transclude: {
      'label': '?label',
      'hint': '?hint'
    },
    controller: pinCaptureController
  }
}
