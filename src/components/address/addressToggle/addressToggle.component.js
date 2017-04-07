/**
 * Created on 2017-01-24.
 * Component for address toggle
 */
(function() {
'use strict';

  module.exports = {
    bindings: { 
      localAddress: '=',
      form: '='
    },
    templateUrl: './components/address/addressToggle/addressToggle.template.html',
    controller: addressToggleController,
  };

  addressToggleController.$inject = [];
  function addressToggleController () {

    this.$onInit = () => {

      /** Set default address type */
      this.localAddress.addressType = this.localAddress.addressType || 'Street';

      /** Function declarations */
      this.clear = () => {
        this.localAddress.streetNumber = '';
        this.localAddress.streetName = '';
        this.localAddress.streetType = '';
        this.localAddress.streetDirection = '';
        this.localAddress.unitNumber = '';
        this.localAddress.line2 = '';
        this.localAddress.postBox = '';
        this.localAddress.retailPostOffice = '';
        this.localAddress.station = '';
        this.localAddress.ruralRoute = '';
      }
    };

  }
})();
