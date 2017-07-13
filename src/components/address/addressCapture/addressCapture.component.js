/**
 * Created on 2017-01-17.
 * Address Capture Component
 */
/* @ngInject */
function addressCapture$ctrl ($translate, Endpoint, ICON_RGX) {
  this.$onInit = () => {
    this.rgx = ICON_RGX.rgx

    this.getCity = Endpoint.getCity
    this.selectCity = selectCity

    this.provinces = ['ON', 'AB', 'BC', 'MB', 'NL', 'NB', 'NT', 'NS', 'NU', 'PE', 'QC', 'SK', 'YT']
                      .map(code => $translate.instant(`addressCapture.${code}`))
  }

  /**
   * Sets city to local address on select
   * @param selected
  */
  function selectCity (selected) {
    this.localAddress.city = selected.city
  }
}

export default {
  name: 'addressCapture',
  component: {
    bindings: {
      localAddress: '=',
      form: '='
    },
    controller: addressCapture$ctrl,
    templateUrl: './components/address/addressCapture/addressCapture.template.html'
  }
}
