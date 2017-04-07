/**
 * Created on 2017-03-08.
 * Component for LOT typeahead
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      immunization: '=',
      snomed: '<'
    },
    controller: immunizationLotInputController,
    templateUrl: './components/immunization/immunizationLotInput/immunizationLotInput.template.html'
  };

  immunizationLotInputController.$inject = ['Endpoint', 'Lot'];
  function immunizationLotInputController (Endpoint, Lot) {
    let $ctrl = this;

    $ctrl.$onInit = () => {
      $ctrl.getLot = getLot;
      $ctrl.setLot = setLot;
      $ctrl.displayCard = false;
      $ctrl.onFieldClear = onFieldClear;

      /* Set up array and call get lot function*/
      $ctrl.lotSelection = '';

      if ($ctrl.immunization.lot.number !== '') {
        $ctrl.lotSelection = $ctrl.immunization.lot;
        setLot($ctrl.lotSelection);
        // $ctrl.displayCard = true;
      }

      $ctrl.lotArray = [];
      getLot();
    };

    $ctrl.$onChanges = (changes) => {
      if (changes.snomed.currentValue !== changes.snomed.previousValue) {
        $ctrl.displayCard = false;
        getLot();
      }
    };


    /**
     * Clears lot after user clicks x on card to reset
     * @param clear
     */
    function onFieldClear () {
      $ctrl.displayCard = false;
      $ctrl.lotSelection = '';
      $ctrl.cardInfo = {};
      $ctrl.immunization.lot = new Lot();
    }

    /**
     * sets lot to immunization lot
     * @param lot: Lot to set immunization lot to
     */
    function setLot(lot){
      $ctrl.cardInfo = {title: lot.number};
      $ctrl.displayCard = true;
      $ctrl.immunization.lot = lot;
    }


    /**
     * Gets list of lot numbers associated with selected immunization trade snomed
     */
    function getLot() {
      $ctrl.lotArray = [];
      if(!!$ctrl.snomed) {
        Endpoint.lookupLots($ctrl.snomed)
          .then( function(results) {
            $ctrl.lotArray = results;
            return results;
          });
      }
    }
  };
})();
