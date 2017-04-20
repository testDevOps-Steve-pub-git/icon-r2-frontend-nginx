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

    /**
     * Groups a flat array of Immunization objects into arrays of Immunization with a common target SNOMED.
     * @param {Array<Immunization>} immunizations - the array of immuniztions to regroup
     * @returns {Array<Array<Immunization>>} - immunizations grouped by agent
     */
    function groupImmunizationsByAgentTrade (immunizations) {
      let immunizationsKeyedByAgentTrade = immunizations
                                     .reduce((immunizations, i) => {
                                       // Target the trade SNOMED if there is one, otherwise, use generic agent SNOMED.
                                       let targetSnomed = (!!i.trade.snomed)
                                                            ? i.trade.snomed
                                                            : i.agent.snomed;
                                       if (!immunizations[targetSnomed]) immunizations[targetSnomed] = [];
                                       // Add the immunization to the array at the key matching it's target SNOMED code.
                                       immunizations[targetSnomed].push(i.clone());

                                       return immunizations;
                                      }, {});

      let immunizationsGroupedByAgentTrade = Object.keys(immunizationsKeyedByAgentTrade)
                                       .reduce((immunizationsByAgentTrade, key) => {
                                          // Strip the source object into an array holding it's values.
                                          immunizationsByAgentTrade.push(immunizationsKeyedByAgentTrade[key]);

                                          return immunizationsByAgentTrade;
                                        }, []);

      return immunizationsGroupedByAgentTrade;
    }

    return {
      immunization: {
        byDate: groupImmunizationsByDate,
        byAgentTrade: groupImmunizationsByAgentTrade,
      }
    };
  }

}());
