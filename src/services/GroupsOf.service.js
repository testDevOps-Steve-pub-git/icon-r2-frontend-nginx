(function () {
'use strict';
  module.exports = GroupsOf;

  function GroupsOf () {

    /**
     * Groups a flat array of Immunization objects into arrays of Immunization with a common date.
     * @param {Array<Immunization>} immunizations - the array of immuniztions to regroup
     * @returns {Array<Array<Immunization>>} - immunizations grouped by date
     */
    function groupImmunizationsByDate (immunizations) {
      let immunizationsKeyedByDate = immunizations
                                     .reduce((immunizations, i) => {
                                        // Create a new empty array to hold entries for this date if it doesn't exist yet.
                                        if (!immunizations[i.date]) immunizations[i.date] = [];
                                        // Add the immunization to the array at the key matching it's date.
                                        immunizations[i.date].push(i.clone());

                                        return immunizations;
                                      }, {});

      let immunizationsGroupedByDate = Object.keys(immunizationsKeyedByDate)
                                       .reduce((immunizationsByDate, key) => {
                                          // Strip the source object into an array holding it's values.
                                          immunizationsByDate.push(immunizationsKeyedByDate[key]);

                                          return immunizationsByDate;
                                        }, []);

      return immunizationsGroupedByDate;
    }

    return {
      immunization: {
        byDate: groupImmunizationsByDate
      }
    };
  }

}());
