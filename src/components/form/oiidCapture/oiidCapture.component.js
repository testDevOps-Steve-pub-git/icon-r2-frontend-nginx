/* @ngInject */
function oiidCapture$ctrl (
  Notify,
  ICON_NOTIFICATION,
  ICON_RGX
) {
  this.$onInit = () => {
    this.rgx = ICON_RGX.rgx
    this.oiidOptions = {
      maskDefinitions: {
        'A': /[2-9b-df-hj-np-tv-xzB-DF-HJ-NP-TV-XZ]/
      },
      addDefaultPlaceholder: false
    }

    this.openOiidHintModal = () => Notify.publish(ICON_NOTIFICATION.INFO_OIID_HINT)
  }
}

export default {
  name: 'oiidCapture',
  component: {
    bindings: {
      oiid: '=',
      form: '=',
      onOiidChange: '&?',
      isOptional: '<'
    },
    templateUrl: './components/form/oiidCapture/oiidCapture.template.html',
    controller: oiidCapture$ctrl,
    transclude: {
      'label': '?label',
      'errors': '?errors'
    }
  }
}
