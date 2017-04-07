(function () {
'use strict';
  module.exports = By;

  function By (DISEASE_YC_ORDER) {


    function complement (comparator) {
      return (left, right) => comparator(right, left);
    }

    let diseaseSnomedYcOrderAsc = (left, right) => {
      if (DISEASE_YC_ORDER[left.snomed] > DISEASE_YC_ORDER[right.snomed]) return 1;
      if (DISEASE_YC_ORDER[left.snomed] < DISEASE_YC_ORDER[right.snomed]) return -1;
      if (left.name > right.name) return 1;
      if (left.name < right.name) return -1;
      return 0;
    };

    let groupOfImmunizationFirstDateAsc = (left, right) => {
      if (left.length && right.length) {
        if (left[0].date > right[0].date) return 1;
        if (left[0].date < right[0].date) return -1;
      }
      return 0;
    }

    return {
      disease: {
        snomed: {
          ycOrderAsc:   diseaseSnomedYcOrderAsc,
          ycOrderDesc:  complement(diseaseSnomedYcOrderAsc),
        }
      },
      groupOfImmunization: {
        firstDateAsc: groupOfImmunizationFirstDateAsc,
        firstDateDesc: complement(groupOfImmunizationFirstDateAsc),
      },
    };
  }

}());
