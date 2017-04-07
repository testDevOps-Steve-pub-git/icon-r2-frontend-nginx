/**
 * Created on 2017-02-09.
 * Component for submitter phone capture
 */
(function(){
'use strict';

   module.exports = {
    templateUrl: './components/submitter/submitterContactCapture/submitterPhoneCapture.template.html',
    bindings: {
      localSubmitterInfo: '=',
      form: '='
    },
    controller: submitterPhoneController
  };

  submitterPhoneController.$inject = ['ICON_RGX'];
  function submitterPhoneController(ICON_RGX) {

    this.$onInit = ()=> {
      /** Regex Librariess */
      this.rgx = ICON_RGX.rgx;
    }

  }
})();
