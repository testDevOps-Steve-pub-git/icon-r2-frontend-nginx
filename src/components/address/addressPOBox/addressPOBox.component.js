/**
 * Created on 2017-01-18.
 * Component for POBox information capture
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      localAddress: '=',
      form: '=',
    },
    templateUrl: './components/address/addressPOBox/addressPOBox.template.html',
    controller: addressPOBoxController,
  };

  addressPOBoxController.$inject = ['ICON_RGX'];
  function addressPOBoxController (ICON_RGX) {
    this.$onInit = ()=> {

      /** Regex Libraries */
      this.rgx = ICON_RGX.rgx;
    }
  }

})();
