(function () {
'use strict';

  module.exports = {
    bindings: {
      immunizations:  '<',
      add:            '&',
      onRemove:       '&',
      openModal:      '<',
    },
    controller: immunizationsByDateController,
    templateUrl: './components/immunization/byDate/immunizationsByDate/immunizationsByDate.template.html'
  };

  immunizationsByDateController.$inject = ['ImmunizationGroup', 'Immunization', 'ImmunizationRecordService'];
  function immunizationsByDateController (ImmunizationGroup, Immunization, ImmunizationRecordService) {
    this.$onInit = () => {
      this.immunizationGroups = generateGroupedImmunizations(this.immunizations);

      this.addImmunization = (immunization) => {
        this.add({ immunization: immunization });
      }
  
      this.remove = (immunization) => {
        this.onRemove({ immunization: immunization });
      };

      this.openAddImmunization = () => {
        let save = (immunization) => { this.addImmunization(immunization); };
        this.openModal(new Immunization(), save);
      };
    };


    this.$onChanges = (changes) => {
      if (changes.immunizations.currentValue) {
        this.immunizationGroups = generateGroupedImmunizations(changes.immunizations.currentValue);
      }
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
}());
