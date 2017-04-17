(function () {
'use strict';
  module.exports = By;

  function By (Is, Immunization, DISEASE_YC_ORDER) {


    function reverse (comparator) {
      return (left, right) => comparator(right, left);
    }

    function diseaseSnomedYcOrderAsc (left, right) {
      if (DISEASE_YC_ORDER[left.snomed] > DISEASE_YC_ORDER[right.snomed]) return 1;
      if (DISEASE_YC_ORDER[left.snomed] < DISEASE_YC_ORDER[right.snomed]) return -1;
      if (left.name > right.name) return 1;
      if (left.name < right.name) return -1;
      return 0;
    }

    function groupOfImmunizationFirstDateAsc (left, right) {
      if (left.length && right.length) {
        if (left[0].date > right[0].date) return 1;
        if (left[0].date < right[0].date) return -1;
      }
      return 0;
    }

    function immunizationPrevalenceIndexAsc (left, right) {
      const SORT_PADDING = 100;

      // Use padding to uncommon immunizations to order after common ones.
      let leftPrevalence = (Is.immunization.commonPrevalence(left))
            ? left.getPrevalence()
            : left.getPrevalence() + SORT_PADDING;
      let rightPrevalence = (Is.immunization.commonPrevalence(right))
            ? right.getPrevalence()
            : right.getPrevalence() + SORT_PADDING;

      // When two immunizations have the same prevalence, order them by name instead.
      if (leftPrevalence === rightPrevalence) {
        // First consider the type of immunization.
        if (left.getType() !== right.getType()) {
          if (left.getType() === Immunization.type.GENERIC) return -1;
          if (right.getType() === Immunization.type.GENERIC) return 1;
        }

        // Use the trade short name instead of agent short name whenever there is one.
        let leftDisplayName = (Is.immunization.genericVaccine(left))
              ? left.agent.shortName.toUpperCase()
              : left.trade.shortName.toUpperCase();
        let rightDisplayName = (Is.immunization.genericVaccine(right))
              ? right.agent.shortName.toUpperCase()
              : right.trade.shortName.toUpperCase();

        // Return the alphabetical sort order.
        if (leftDisplayName > rightDisplayName) return 1;
        if (leftDisplayName < rightDisplayName) return -1;
        return 0;
      }

      // By default, use prevalence values.
      return leftPrevalence - rightPrevalence;
    }

    return {
      disease: {
        snomed: {
          ycOrderAsc:   diseaseSnomedYcOrderAsc,
          ycOrderDesc:  reverse(diseaseSnomedYcOrderAsc),
        }
      },
      groupOfImmunization: {
        firstDateAsc:   groupOfImmunizationFirstDateAsc,
        firstDateDesc:  reverse(groupOfImmunizationFirstDateAsc),
      },
      immunization: {
        prevalenceAsc:  immunizationPrevalenceIndexAsc,
        prevalenceDesc: reverse(immunizationPrevalenceIndexAsc),
      }
    };
  }

}());
