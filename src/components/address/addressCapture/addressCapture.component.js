/**
 * Created on 2017-01-17.
 * Address Capture Component
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      localAddress: '=',
      form: '=',
    },
    controller: addressCaptureController,
    templateUrl: './components/address/addressCapture/addressCapture.template.html',
  };

  addressCaptureController.$inject = ['$translate', 'Endpoint', 'ICON_RGX'];
  function addressCaptureController ($translate, Endpoint, ICON_RGX) {

    this.$onInit = () => {
      this.rgx = ICON_RGX.rgx;

      this.getCity = Endpoint.getCity;
      this.selectCity = selectCity;

      this.provinces =  ['ON', 'AB', 'BC', 'MB', 'NL', 'NB', 'NT', 'NS', 'NU', 'PE', 'QC', 'SK', 'YT']
                        .map(code => $translate.instant(`addressCapture.${code}`));
    };

    /**
     * Sets city to local address on select
     * @param selected
    */
    function selectCity (selected) {
      this.localAddress.city = selected.city;
    }
  }

})();
