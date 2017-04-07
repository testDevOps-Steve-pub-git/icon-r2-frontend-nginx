/**
 * Created on 2017-02-16.
 * Component to hold all individual immunizations
 * Automatically sorted by date
 */
(function() {
'use strict';

  module.exports = {
    template: `
      <div ng-repeat="immunizationGroup in $ctrl.immunizationGroups track by $index">
        <immunization-review-display
          immunizations="immunizationGroup.immunizations"
          patient="$ctrl.patient">
        </immunization-review-display>
      </div>
    `,
    bindings: {
      immunizations: '<',
      patient: '<'
    },
    controller: immunizationReviewDisplayController
  };
 
  immunizationReviewDisplayController.$inject = ['ImmunizationGroup'];
  function immunizationReviewDisplayController(ImmunizationGroup) {

    this.$onInit = ()=> {
      this.immunizationGroups = generateGroupedImmunizations(this.immunizations);
    };

    function generateGroupedImmunizations (immunizations) {
      // Creates empty unique ImmunizationGroups by plucking unique dates.
      let toUniqueGroups = (accum, current, index, collection) => {
        let groupExists = (0 <= accum.findIndex(
          (immGroup) => immGroup.title === current.date
        ));
        if (!groupExists) accum.push(new ImmunizationGroup(current.date));
        return accum;
      };

      // Populates Immunizations to the ImmunizationGroup with a matching date (as title).
      let ungrouped = immunizations;
      let toGroupedImmunizations = (emptyGroup) => {
        let clonedGroup = emptyGroup.clone();
        clonedGroup.immunizations = ungrouped
          .filter((imm) => imm.date === emptyGroup.title);
        return clonedGroup;
      };

      let orderByDateAsc = (a, b) => {
        if (a.title > b.title) return 1;
        else if (b.title > a.title) return -1;
        return 0;
      };

      let orderByDateDesc = (a, b) => -orderByDateAsc(a, b);

      return immunizations
        .reduce(toUniqueGroups, [])
        .map(toGroupedImmunizations)
        .sort(orderByDateAsc);
    }
  }

})();
