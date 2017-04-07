/**
 * Created on 2017-03-10.
 * Component for a yellowcard display cell to display a check or not
 * @Inputs- row is the yellowcard row
 *        - diseaseHeader is the individual disease associated with that cell (Corresponds with header display)
 *  If the disease header matches a disease in the row, then it will display as checked
 */
(function(){
  'use strict';

  module.exports = {
    bindings: { row: '<', diseaseHeader: '<' },
    controller: yellowCardDisplayCellController,
    template: `
      <div>
        <span ng-if="$ctrl.showCheck" class="fa fa-ok"></span>
      </div>
    `
  };

  yellowCardDisplayCellController.$inject = [];
  function yellowCardDisplayCellController () {

    this.$onInit = ()=> {

      this.showCheck = false;

      let diseasesFromImmunization = this.row.diseases;
      for(let i = 0; i <= diseasesFromImmunization.length; i++) {
        if(!!diseasesFromImmunization[i]) {
          if(diseasesFromImmunization[i].name == this.diseaseHeader) {
            this.showCheck = true;
          }
        }
      }
    }
  }

}());
