/**
 * Created on 2017-01-18.
 * Component for rural address type
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      localAddress: '=',
      form: '=',
    },
    templateUrl: './components/address/addressRural/addressRural.template.html',
    controller: addressRuralController,
  };

  addressRuralController.$inject = ['ICON_RGX'];
  function addressRuralController (ICON_RGX) {
    this.$onInit = ()=> {

      /** Regex Libraries */
      this.rgx = ICON_RGX.rgx;
    }
  }
})();
