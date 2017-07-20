/* @ngInject */
function hcnCaptureController (
  ICON_RGX
) {
  this.$onInit = () => {
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
  name: 'hcnCapture',
  component: {
    bindings: {
      healthCardNumber: '=',
      form: '=',
      displayImage: '<',
      isOptional: '<'
    },
    transclude: {
      'label': '?label',
      'hint' : '?hint'
    },
    templateUrl: './components/form/hcnCapture/hcnCapture.template.html',
    controller: hcnCaptureController
  }
}
