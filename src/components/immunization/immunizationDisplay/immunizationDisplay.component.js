(function () {
'use strict';

  module.exports = {
    bindings: { immunization: '=' },
    controller: immunizationDisplayController,
    templateUrl: './components/immunization/immunizationDisplay/immunizationDisplay.template.html'
  };

  immunizationDisplayController.$inject = [];
  function immunizationDisplayController () {
    this.$onInit = () => {}
  }

}());
