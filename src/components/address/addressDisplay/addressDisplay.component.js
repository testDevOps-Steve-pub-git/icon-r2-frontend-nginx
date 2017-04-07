/**
 * Created on 2017-01-19.
 * Address display component
 */
(function(){
  'use strict';

  module.exports = {
    bindings: {
      addressInfo: '<',
    },
    templateUrl: './components/address/addressDisplay/addressDisplay.template.html',
    controller: addressDisplayController,
  };

  addressDisplayController.$inject = [];
  function addressDisplayController () {}
})();
