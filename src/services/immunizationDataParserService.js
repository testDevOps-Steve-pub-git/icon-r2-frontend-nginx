/**
 * immunization data parser
 * @namespace Services
 */
(function(){
  'use strict';

  angular
      .module('icon.immunizationDataParserService', [])
      .factory('immunizationDataParser', immunizationDataParser);

      immunizationDataParser.$inject = ['$filter'];

      /**
       * @namespace immunizationDataParserService
       * @desc Service for parsing immunization data
       * @memberOf Services
       */
      function immunizationDataParser($filter){
        var formattedImmunizations = [];

        /**
         * @desc searches for object with an array value
         * @memberof - immunizationDataParserService
         * @param {array} csvString - array to search
         * @param {string} attr - attribute to search for
         * @param {string} value - value to search for
         * @return {int} the index of found attirbute value if nothing found returns -1
         */
        function findObjectWithAttr(array, attr, value) {
          for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
              return i;
            }
          }
          return -1;
        }

        /**
         * @desc converts comma seperated value to array
         * @memberof - immunizationDataParserService
         * @param {array} csvString - array to convert
         */
        function csvToArray(csvString){
          var array = csvString.split(',');

          for(var k = 0; k < array.length; k++) {
            array[k] = array[k].trim();
          }
          return array;
        }

        /**
         * @desc converts immunization schedule to viewable data from the yellowcard
         * @memberof - immunizationDataParserService
         * @param {Array} immunizationSchedule - array of immunization objects
         * @return {Array} formatted immuzation for parsing in review
         */
        function formatImmunizations(immunizationSchedule){
          formattedImmunizations = [];
          for(var i = 0; i < immunizationSchedule.length; i++){
            for(var j = 0; j < immunizationSchedule[i].Agent_List.length; j++){
              var agentArray = immunizationSchedule[i].Agent_List[j];
              var agentDate = $filter('date')(agentArray.date,'yyyy-MM-dd');
              var index = findObjectWithAttr(formattedImmunizations, 'rowDate', agentDate);
              var diseasesArray = csvToArray(agentArray.Diseases);

              var vaccineObject = {
                Diseases: diseasesArray,
                ICONDisplay: agentArray.ICON_Display,
                AgentSNOMED: agentArray.Agent_SNOMED || agentArray.SNOMED.toString(),
                PanormamaAgentDisplay: agentArray.Panorama_Agent_Display
              };

              var row = {
                rowDate: agentDate,
                diseasesDisplay: diseasesArray,
                isDateApproximate: agentArray.isDateApproximate || false,
                vaccinesDisplay: [],
                vaccines: [vaccineObject],
                comment: (!!agentArray.comment) ? agentArray.comment : ''
              };

              //if array cannot be found inside of the array then add it
              if(index !== -1 && !!agentArray.date){
                formattedImmunizations[index].vaccines.push(vaccineObject);

                for(var k = 0; k < diseasesArray.length; k++) {
                  if(formattedImmunizations[index].diseasesDisplay.indexOf(diseasesArray[k]) === -1){
                    formattedImmunizations[index].diseasesDisplay.push(diseasesArray[k]);
                  }
                }

              } else if(!!agentArray.date) {
                formattedImmunizations.push(row);
              }
            }
          }
          return formattedImmunizations;
        }

        var immunizationDataParser = {
          formatImmunizations: formatImmunizations
        }

        return immunizationDataParser;

      }
})()
