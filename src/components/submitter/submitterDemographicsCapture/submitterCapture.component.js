/**
 * Created on 2017-01-24.
 * Component for submitter demographic capture
 */
(function(){
'use strict';

  module.exports = {
    templateUrl: './components/submitter/submitterDemographicsCapture/submitterCapture.template.html',
    bindings: {
      localSubmitterInfo: '=',
      form: '='
    },
    controller: submitterCaptureController
  };

submitterCaptureController.$inject = ['ICON_RGX'];
function submitterCaptureController (ICON_RGX) {

  this.$onInit = () => {
    /** Regex Librariess */
    this.rgx = ICON_RGX.rgx;
  }

}
})();
