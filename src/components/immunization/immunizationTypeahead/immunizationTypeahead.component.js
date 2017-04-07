/**
 * Created on 2017-01-11.
 * Typeahead component for immunizations
 * Gating Questions:
 *  1 or 4 - No typical tags, international, show all agents
 *  2 - prev 1- Typical tags for prevalence Index, Ontario, only show agents with prevalance of 1-3
 *  3 - prev 1, 4-  Typical tags for prevalence Index, Canada, only show agents with prevalance of 1-4
 */
(function(){
'use strict';

  module.exports = {
    bindings: { model: '=' },
    controller: ImmunizationTypeaheadController,
    templateUrl: './components/immunization/immunizationTypeahead/immunizationTypeahead.template.html'
  };

  ImmunizationTypeaheadController.$inject = ['GatingQuestionService', 'Endpoint', 'Agent', 'Lot', 'Trade'];
  function ImmunizationTypeaheadController (GatingQuestionService, Endpoint, Agent, Lot, Trade) {

    let $ctrl = this;

    // Functions
    $ctrl.onVaccineSelect = onVaccineSelect;
    $ctrl.onFieldClear = onFieldClear;
    $ctrl.getImmunization = getImmunization;
    $ctrl.modifyDataForTemplate = modifyDataForTemplate;
    $ctrl.combineArrays = combineArrays;
    $ctrl.calculateRemaining = calculateRemaining;
    $ctrl.addGatingQuestionToArray = addGatingQuestionToArray;
    $ctrl.filterListFromGatingQuestion = filterListFromGatingQuestion;

    // Variables
    $ctrl.selectedVaccine = '';
    $ctrl.autoCompleteLimit = 15;
    $ctrl.remaining = 0;
    $ctrl.gatingQuestion = 0;
    $ctrl.displayCard = false;

    $ctrl.$onInit = () => {
      $ctrl.gatingQuestion = GatingQuestionService.getGatingQuestion();

      if ($ctrl.model.agent.snomed !== '') {
        onVaccineSelect($ctrl.model);
      }
    };

    /**
     * When the user selects a vaccine from the typeAhead
     * @param selected: item user has selected
     */
    function onVaccineSelect (selected) {
      $ctrl.displayCard = true;
      $ctrl.model.agent = selected.agent;
      $ctrl.model.trade = selected.trade;
      $ctrl.model.lot = selected.lot;
      $ctrl.selectedVaccine = $ctrl.model;
    }


    /**
     * Clear card after delete button is selected, to allow user to enter another immunization
     * @param clear
     */
    function onFieldClear () {
      if ($ctrl.displayCard) {
        $ctrl.displayCard = false;
        $ctrl.model.agent = new Agent();
        $ctrl.model.trade = new Trade();
        $ctrl.model.lot = new Lot();
        $ctrl.cardInfo = {};
        $ctrl.selectedVaccine = '';
      }
    }


    /**
     * Gets the immunization from the typeahead
     * First then: Modifies array to carry data used for different displays in the template
     * Second then: adds gating question to data used for the Canadian, Ontario, and International Immunizations
     * @param search: Search query the user types in
     * @returns {*}: the results of the query to be displayed in the typeahead list
     */
    function getImmunization (search) {

      return Endpoint.lookupImmunizations(search)
        .then(function(results) {
          let resultsWithFirstCells = modifyDataForTemplate(results);
          return resultsWithFirstCells;
        })
        .then(function(results){
          let resultsWithGating = addGatingQuestionToArray(results);
          return resultsWithGating;
        })
        .catch(function(error){
          console.log(error);
        })
    }


    /**
     * Modify results array to populate data used to display templates in certain ways
     * FirstCell is used for header to display remaining results
     * Remaining results are also calculated
     * @param results: results array
     * @returns {*}: modified array
     */
    function modifyDataForTemplate(results) {
      let combinedArrays = combineArrays(results);

      $ctrl.remaining = calculateRemaining(combinedArrays);
      if ($ctrl.remaining > 0) {
        combinedArrays[$ctrl.autoCompleteLimit - 1].remaining = $ctrl.remaining;
      }

      if (combinedArrays.length > 0) {
        combinedArrays[0].remaining = $ctrl.remaining;
      }

      return combinedArrays;
    }


    /**
     * The results is an object with two arrays. This function combines the two arrays together
     * @param results: query results
     * @returns {[*,*]} One array with both trades and agents
     */
    function combineArrays(results){
      let tradesArray = angular.copy(results.trades);
      let agentsArray = angular.copy(results.agents);
      tradesArray.forEach(function(trade){
        trade.type = "Trades";
        trade.trade.shortName = trade.agent.name;
        trade.prevalenceIndex = trade.trade.prevalenceIndex;
      });
      agentsArray.forEach(function(agent){
        agent.type = "Agents";
        agent.prevalenceIndex = agent.agent.prevalenceIndex;
      });

      if(!!tradesArray[0]) {
        if(tradesArray[0].firstInGroup != true)
          tradesArray[0].firstInGroup = true;
      }

      if(!!agentsArray[0]) {
        if(agentsArray[0].firstInGroup != true)
          agentsArray[0].firstInGroup = true;
      }

      let combinedArrays = [...agentsArray, ...tradesArray];
      if(!!combinedArrays[0])
        combinedArrays[0].firstCell = true;

      return combinedArrays;
    }


    /**
     * Calculate the remaining results from the typeahead that are currently not being displayed
     * @param resultArray: result from the typeahead query
     * @returns {number}: number of results that are currently hidden
     */
    function calculateRemaining (resultArray) {
      let remaining = resultArray.length - $ctrl.autoCompleteLimit;
      if(remaining > 0)
        return remaining;
      else
        return remaining = 0;
    }



    /**
     * Add gating question to data, used for Canadian, Ontario, International differences in templates
     * @param results: results array
     * @returns: results with gatingQuestion data
     */
    function addGatingQuestionToArray(results) {
      let resultsWithGating = results;
      /**Add gating question to fields for purpose of Ontario, Canadian, International typeAhead differences**/
      for(let i = 0; i <=resultsWithGating.length; i++) {
        if(!!resultsWithGating[i])
          resultsWithGating[i].gatingQuestion = $ctrl.gatingQuestion;
      }

      return resultsWithGating;
    }



    /**
     * Returns results based on gating question, due to displaying different agents for Ontario, Canadian, and International typeaheads
     * Rules:
     *  Gating question is 2: Ontario, display results with prevalance of 1-3
     *  Gating question is 3: Canadian: display results with prevalence of 1-4,
     *  Gating question is 1, or 4- international: display all results
     * @param results: results of typeahead query to filter down
     * @returns {*} filtered list based on rules
     */
    function filterListFromGatingQuestion(results) {
      let filteredResults = results;

      if($ctrl.gatingQuestion == 2 ) {
        let ontarioResults = [];
        filteredResults.forEach( (result)=> {
          if(result.prevalenceIndex > 0 && result.prevalenceIndex <= 3){
            ontarioResults.push(result);
          }
        });
        filteredResults = ontarioResults;
      }
      else if($ctrl.gatingQuestion == 3) {
        let canadaResults = [];
        filteredResults.forEach( (result)=> {
          if(result.prevalenceIndex > 0 && result.prevalenceIndex <= 4){
            canadaResults.push(result);
          }
        });
        filteredResults = canadaResults;
      }
      else {
        filteredResults = results;
      }
      return filteredResults;
    }

  }

})();
