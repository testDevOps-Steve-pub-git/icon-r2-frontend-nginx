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
  function addressCaptureController($translate, Endpoint, ICON_RGX) {


    this.$onInit = ()=> {
      /** Functions */
      this.buildProvinces = buildProvinces;
      this.addProvinceWithTranslationToArray = addProvinceWithTranslationToArray;
      this.getCity = Endpoint.getCity;
      this.selectCity = selectCity;

      /** Regex Libraries */
      this.rgx = ICON_RGX.rgx;

      /** Building select box for provinces */
      this.buildProvinces();
      this.provinces = selectProvinceArray;
    };

    /**
     * Sets city to local address on select
     * @param selected
    */
    function selectCity(selected) {
      this.localAddress.city = selected.city;
    }

    /**
     * builds the provinces array for select
     * @memberof addressCaptureController
    */
    function buildProvinces(){
      let provincesArray = ['addressCapture.AB', 'addressCapture.BC', 'addressCapture.MB', 'addressCapture.NL', 'addressCapture.NB', 'addressCapture.NT', 'addressCapture.NS', 'addressCapture.NU', 'addressCapture.ON', 'addressCapture.PE', 'addressCapture.QC', 'addressCapture.SK', 'addressCapture.YT'];
      //Iterate through localized provinces to add them to array to display in select box
      for(var i = 0; i < provincesArray.length; i++) {
        addProvinceWithTranslationToArray(provincesArray[i]);
      }
    }

    /**
     * Takes the provinces from their localization objects and puts them into an array
     * @memberof addressCaptureController
     * @param {Object} province: province to add from the localization object to the provinces array
    */
    let selectProvinceArray = [];
    function addProvinceWithTranslationToArray(province) {
      $translate(province).then(function (p) {
        let province = p.toString();
        selectProvinceArray.push(province);
      });
    }
  }

})();
