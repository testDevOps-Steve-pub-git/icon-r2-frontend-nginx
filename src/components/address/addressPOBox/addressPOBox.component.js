/**
 * Created on 2017-01-18.
 * Component for POBox information capture
 */
/* @ngInject */
function addressPOBox$ctrl (ICON_RGX) {
  this.$onInit = () => {
    /** Regex Libraries */
    this.rgx = ICON_RGX.rgx
  }
}

export default {
  name: 'addressPoBox',
  component: {
    bindings: {
      localAddress: '=',
      form: '='
    },
    templateUrl: './components/address/addressPOBox/addressPOBox.template.html',
    controller: addressPOBox$ctrl
  }
}
