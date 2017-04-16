(function () {
'use strict';
  module.exports = Is;

  function Is (Immunization) {

    function complement (predicate) {
      return (thing) => !predicate(thing);
    }

    function isImmunizationCommonPrevalence (immunization) {
      const COMMON_WHITELIST = [ 1, 4 ];
      return COMMON_WHITELIST.indexOf(immunization.getPrevalence()) >= 0;
    }

    function isImmunizationInternationalPrevalence (immunization) {
      const INTERNATIONAL_WHITELIST = [ 1, 2, 3, 4, 5, 6, 9 ];
      return INTERNATIONAL_WHITELIST.indexOf(immunization.getPrevalence()) >= 0;
    }

    function isImmunizationCanadaPrevalence (immunization) {
      const CANADA_WHITELIST = [ 1, 2, 3, 4, 5, 6 ];
      return CANADA_WHITELIST.indexOf(immunization.getPrevalence()) >= 0;
    }

    function isImmunizationOntarioPrevalence (immunization) {
      const ONTARIO_WHITELIST = [ 1, 2, 3 ];
      return ONTARIO_WHITELIST.indexOf(immunization.getPrevalence()) >= 0;
    }

    function isImmunizationGenericVaccine (immunization) {
      // If there isn't a trade snomed, then it is an agent without a trade.
      return immunization.getType() === Immunization.type.GENERIC;
    }

    function isImmunizationBrandedVaccine (immunization) {
      // If there isn't a trade snomed, then it is an agent without a trade.
      return immunization.getType() === Immunization.type.BRANDED;
    }

    return {
      immunization: {
        genericVaccine:           isImmunizationGenericVaccine,
        brandedVaccine:           isImmunizationBrandedVaccine,
        commonPrevalence:         isImmunizationCommonPrevalence,
        internationalPrevalence:  isImmunizationInternationalPrevalence,
        canadaPrevalence:         isImmunizationCanadaPrevalence,
        ontarioPrevalence:        isImmunizationOntarioPrevalence,
        not: {
          genericVaccine:           complement(isImmunizationGenericVaccine),
          brandedVaccine:           complement(isImmunizationBrandedVaccine),
          commonPrevalence:         complement(isImmunizationCommonPrevalence),
          internationalPrevalence:  complement(isImmunizationInternationalPrevalence),
          canadaPrevalence:         complement(isImmunizationCanadaPrevalence),
          ontarioPrevalence:        complement(isImmunizationOntarioPrevalence),
        }
      }
    };
  }

}());
