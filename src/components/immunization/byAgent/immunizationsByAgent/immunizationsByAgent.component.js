(function () {
'use strict';

  module.exports = {
    bindings: {
      immunizations:  '<',
      add:            '&',
      onRemove:       '&',
      openModal:      '<',
    },
    controller: immunizationsByAgentController,
    templateUrl: './components/immunization/byAgent/immunizationsByAgent/immunizationsByAgent.template.html'
  };

  immunizationsByAgentController.$inject = ['ImmunizationGroup', 'Immunization', 'ImmunizationRecordService'];
  function immunizationsByAgentController (ImmunizationGroup, Immunization, ImmunizationRecordService) {
    this.$onInit = () => {
      this.immunizationGroups = generateGroupedImmunizations(this.immunizations);

      this.remove = (immunization) => {
        this.onRemove({ immunization: immunization });
      };

      this.addImmunization = (immunization) => {
        this.add({ immunization: immunization });
      };

      this.openAddImmunization = function () {
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
      // Adds a unique ImmunizationGroup object to accumulator array for each
      //    unique Immunization Agent SOMED code found in the array.
      let toUniqueGroups = (accum, current, index, collection) => {
        let groupExists = (0 <= accum.findIndex(
                              (immGroup) => immGroup.title === current.agent.snomed
                          ));
        if (!groupExists) accum.push(new ImmunizationGroup(current.agent.snomed));
        return accum;
      };

      let oderByDateAsc = (a, b) => {
        if (a.date > b.date) return 1;
        else if (b.date > a.date) return -1;
        return 0;
      };

      let orderByDateDesc = (a, b) => -orderByDateDesc(a, b);

      let ungrouped = immunizations;
      // Adds Immunizations to the ImmunizationGroup with a matching date (as title).
      let toGroupedImmunizations = (emptyGroup) => {
        let clonedGroup = emptyGroup.clone();
        clonedGroup.immunizations = ungrouped
                                      .filter((imm) => imm.agent.snomed == emptyGroup.title)
                                      .sort(oderByDateAsc);
        return clonedGroup;
      };

      return immunizations
                  .reduce(toUniqueGroups, [])
                  .map(toGroupedImmunizations);
    }
  }

}());
