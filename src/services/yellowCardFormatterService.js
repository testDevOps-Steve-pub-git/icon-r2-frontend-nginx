/**
 * Service for manipulating yellow cards to display in sorted order etc.
 * @namespace Services
 */
(function(){
  'use strict';

  angular
      .module('icon.yellowCardFormatterService', [])
      .factory('yellowCardFormatter', yellowCardFormatter);

      yellowCardFormatter.$inject = [];
      /**
       * Service for formatting a yellowCard
       * @namespace yellowCardService
       * @memberof Services
       */
      function yellowCardFormatter () {

/* Private ********************************************************************/

        var DISEASE_ORDINALITY = {
          'Diphtheria': 1,    'Diphtérie': 1,
          'Tetanus': 2,       'Tétanos': 2,
          'Pertussis': 3,     'Coqueluche': 3,
          'Polio': 4,         'Poliomyélite': 4,
          'Hib': 5,           // Same
          'Pneumococcal': 6,  'Pneumocoques': 6,
          'Rotavirus': 7,     // Same
          'Measles': 8,       'Rougeole': 8,
          'Mumps': 9,         'Oreillons': 9,
          'Rubella': 10,      'Rubéole': 10,
          'Varicella': 11,    'Varicelle': 11,
          'Meningococcal': 12,'Méningocoques': 12,
          'Hepatitis B': 13,  'Hépatite B': 13,
          'HPV': 14,          'VPH': 14,
          'Influenza': 15,    // Same
          'Hepatitis A': 16,  'Hépatite A': 16,
          'DEFAULT': 999
        };

        /** Comparator for sorting dates in numeric YYYY-MM-DD format (Example: 1999-12-31), in ascending order. */
        function byDateStringAsc (a, b){
          if (a.rowDate > b.rowDate) return 1;
          if (a.rowDate == b.rowDate) return 0;
          return -1;
        }

        /** Comparator for sorting dates in numeric YYYY-MM-DD format (Example: 1999-12-31), in descending order. */
        function byDateStringDesc (a, b) { return -byDateStringAsc(a, b); }

        /** Gets the cardinality of a disease name (as appears on the standard Ontario Yellow Card Immunization record). */
        function getDiseaseOrdinality (diseaseName) {
            if (DISEASE_ORDINALITY[diseaseName.trim()]) {
              return DISEASE_ORDINALITY[diseaseName.trim()];
            }
            return DISEASE_ORDINALITY['DEFAULT'];
        }

        /** Comparator for sorting disease names by cardinality (as appears on the standard Ontario Yellow Card Immunization record), in ascending order. */
        function byDiseaseOrdinalityAsc (a, b) {
          // Disease outside of the normal Yellow Card list must be sorted alphabetically, and appear at the end
          if (
               getDiseaseOrdinality(a) === DISEASE_ORDINALITY.DEFAULT
            && getDiseaseOrdinality(b) === DISEASE_ORDINALITY.DEFAULT
          ) {
            if (a > b) return 1;
            if (a == b) return 0;
            return -1;
          }

          // Diseases in the normal Yellow Card are ordered the same way
          return getDiseaseOrdinality(a) - getDiseaseOrdinality(b);
        }

        /** Filters callback for first / unique occurences of a value in an array. */
        function isFirstOccurence (value, currentIndex, array) {
          return array.indexOf(value) === currentIndex;
        }

        /** Concatenates the disease lists from a collection of immunization rows into a collection of all diseases. */
        function concatDiseaseLists (allDiseases, currentDiseases) {
          return allDiseases.concat(currentDiseases);
        }


/* Public *********************************************************************/

        /**
         * Get all of the unique disease names from a yellow card, sorted first alphabetically, then by ordinality.
         * @param {YellowCard} yellowCard - the yellow card to collect disease names from
         * @returns {string[]} - the sorted collection of unique disease names
         */
        function getUniqueDiseaseNames (yellowCardRows) {
          return yellowCardRows
            .map(function (row) { return row.diseasesDisplay; })  // Remap collection into displayed disease name arrays only
            .reduce(concatDiseaseLists, [])                       // Concatenate all arrays of disease names
            .filter(isFirstOccurence)                             // Pluck out unique values
            .sort(byDiseaseOrdinalityAsc);                        // Order by ordinality from Ontario Yellow Card, then alphabetically for the rest
        }

        /**
         * Sorts a Yellow Card's rows, first by date of immunization then by ordinality of diesase name.
         * NOTE: mutates the YellowCard object passed as an argument.
         * @param {YellowCard} yellowCard - the Yellow Card to be sorted
         * @returns {YellowCard} - a formatted clone of the Yellow Card
         */
        function sortYellowCardRows (yellowCardRows) {
          yellowCardRows
            .sort(byDateStringAsc)                                // Sort all of the rows from oldest to newest entry
            .forEach(function (row) {                             // Sort each row's list of disease names by ordinality
              row.diseasesDisplay.sort(byDiseaseOrdinalityAsc);
            });
        }

        // Return interface to this closure
        return {
          getUniqueDiseaseNames:  getUniqueDiseaseNames,
          sortYellowCardRows:     sortYellowCardRows,
          byDiseaseOrdinalityAsc: byDiseaseOrdinalityAsc
        };
      }
}());
