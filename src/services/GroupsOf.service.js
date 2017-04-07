(function () {
'use strict';
  module.exports = GroupsOf;

  function GroupsOf () {

    function groupImmunizationsByDate (immunizations) {
      let keyGrouping = immunizations
                        .reduce((imms, i) => {
                          if (!imms[i.date]) imms[i.date] = [];
                          imms[i.date].push(i.clone());
                          return imms;
                        }, {})
      return Object.values(keyGrouping);
    }

    return {
      immunization: {
        byDate: groupImmunizationsByDate
      }
    };
  }

}());
