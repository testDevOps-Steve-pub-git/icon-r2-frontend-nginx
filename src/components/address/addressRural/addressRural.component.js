/**
 * Created on 2017-01-18.
 * Component for rural address type
 */
/* @ngInject */
function addressRural$ctrl (ICON_RGX) {
  this.$onInit = () => {
    /** Regex Libraries */
    this.rgx = ICON_RGX.rgx
  }
}

export default {
  name: 'addressRural',
  component: {
    bindings: {
      localAddress: '=',
      form: '='
    },
    templateUrl: './components/address/addressRural/addressRural.template.html',
    controller: addressRural$ctrl
  }
}
