/**
 * Created on 2017-01-11.
 * Typeahead component for immunizations
 * Gating Questions:
 *  1 or 4 - No typical tags, international, show all agents
 *  2 - prev 1- Typical tags for prevalence Index, Ontario, only show agents with prevalance of 1-3
 *  3 - prev 1, 4-  Typical tags for prevalence Index, Canada, only show agents with prevalance of 1-4
 */
(function () {
'use strict';

  module.exports = {
    bindings: { model: '=' },
    controller: ImmunizationTypeaheadController,
    templateUrl: './components/immunization/immunizationTypeahead/immunizationTypeahead.template.html'
  };

  ImmunizationTypeaheadController.$inject = [
    'By', 'Endpoint', 'GatingQuestionService', 'Is',
    'Agent', 'Lot', 'Trade'
  ];
  function ImmunizationTypeaheadController (
    By, Endpoint, GatingQuestionService, Is,
    Agent, Lot, Trade
  ) {
    const MAX_IMMUNIZATION_RESULTS = 10;
    const GATING_RESPONSE = {
      // TODO: What's up with these values?
      INTERNATIONAL:  4,
      CANADA:         3,
      ONTARIO:        2,
    };

    this.displayCard = false;

    this.$onInit = () => {
      this.onVaccineSelect = onVaccineSelect;
      this.onFieldClear = onFieldClear;
      this.getImmunization = getImmunization;
      this.gatingResponse = GATING_RESPONSE;

      this.selectedVaccine = '';
      this.remaining = 0;
      this.displayCard = false;

      if (!!this.model.agent.snomed) onVaccineSelect(this.model);
    };

    /**
     * When the user selects a vaccine from the typeAhead
     * @param selected: item user has selected
     */
    let onVaccineSelect = (selected) => {
      this.displayCard = true;
      this.model.agent = selected.agent;
      this.model.trade = selected.trade;
      this.model.lot = selected.lot;
      this.selectedVaccine = this.model;
    }

    /**
     * Clear card after delete button is selected, to allow user to enter another immunization
     * @param clear
     */
    let onFieldClear = () => {
      if (this.displayCard) {
        this.displayCard = false;
        this.model.agent = new Agent();
        this.model.trade = new Trade();
        this.model.lot = new Lot();
        this.cardInfo = {};
        this.selectedVaccine = '';
      }
    }

    /**
     * Gets the immunization from the typeahead
     * First then: Modifies array to carry data used for different displays in the template
     * Second then: adds gating question to data used for the Canadian, Ontario, and International Immunizations
     * @param search: Search query the user types in
     * @returns {*}: the results of the query to be displayed in the typeahead list
     */
    let getImmunization = (search) => {
      return Endpoint.lookupImmunizations(search)
              .then(formatImmunizationsForTypeahead)
              .catch(console.warn);
    }

    let appendGatingCode = (immunization) => {
      immunization.gatingCode = GatingQuestionService.getGatingQuestion();
      return immunization;
    }

    let appendCommonFlag = (immunization) => {
      immunization.isCommon = Is.immunization.commonPrevalence(immunization);
      return immunization;
    }

    let appendImmunizationType = (immunization) => {
      immunization.type = immunization.getType();
      return immunization;
    }

    let appendDiseaseDisplay = (immunization) => {
      immunization.diseaseDisplay = immunization.agent.diseases
                                                      .map(d => d.name)
                                                      .join(', ');
      return immunization;
    }

    /**
     * Modify results array to populate data used to display templates in certain ways
     * FirstCell is used for header to display remaining results
     * Remaining results are also calculated
     * @param results: results array
     * @returns {*}: modified array
     */
    let formatImmunizationsForTypeahead = (results) => {
      let filteredResults = filterImmunizationsByGating(results);
      let remaining = (filteredResults.length > MAX_IMMUNIZATION_RESULTS)
                          ? (filteredResults.length - MAX_IMMUNIZATION_RESULTS)
                          : 0;
      const gatingQuestion = GatingQuestionService.getGatingQuestion();

      let truncatedResults = filteredResults
                             .sort(By.immunization.prevalenceAsc)
                             .slice(0, MAX_IMMUNIZATION_RESULTS)
                             .map(appendGatingCode)
                             .map(appendCommonFlag)
                             .map(appendImmunizationType)
                             .map(appendDiseaseDisplay);

      let genericVaccines = truncatedResults.filter(Is.immunization.genericVaccine);
      if (genericVaccines.length) genericVaccines[0].isFirstInGroup = true;

      let brandedVaccines = truncatedResults.filter(Is.immunization.brandedVaccine);
      if (brandedVaccines.length) brandedVaccines[0].isFirstInGroup = true;

      let combinedImmunizations = [
        ...genericVaccines,
        ...brandedVaccines
      ];
      if (combinedImmunizations.length) combinedImmunizations[0].remaining = remaining;

      return combinedImmunizations;
    }

    /**
     * Filters and sorts array of Immunization results based on gating question.
     * @param results: results of typeahead query to filter down
     * @returns {*} filtered list based on rules
     */
    let filterImmunizationsByGating = (immunizations) => {
      switch (GatingQuestionService.getGatingQuestion()) {
        case GATING_RESPONSE.ONTARIO:
          // console.info(`ENDPOINT: ${immunizations.length}, ONTARIO FILTERED: ${immunizations.filter(Is.immunization.ontarioPrevalence).length}, REMAINING:${immunizations.filter(Is.immunization.ontarioPrevalence).length - MAX_IMMUNIZATION_RESULTS}`)
          return immunizations.filter(Is.immunization.ontarioPrevalence);

        case GATING_RESPONSE.CANADA:
          // console.info(`ENDPOINT: ${immunizations.length}, CANADA FILTERED: ${immunizations.filter(Is.immunization.canadaPrevalence).length}, REMAINING:${immunizations.filter(Is.immunization.canadaPrevalence).length - MAX_IMMUNIZATION_RESULTS}`)
          return immunizations.filter(Is.immunization.canadaPrevalence);

        case GATING_RESPONSE.INTERNATIONAL:
          // Fall-through to default case.
        default:
          // console.info(`ENDPOINT: ${immunizations.length}, INTERNATIONAL FILTERED: ${immunizations.filter(Is.immunization.internationalPrevalence).length}, REMAINING:${immunizations.filter(Is.immunization.internationalPrevalence).length - MAX_IMMUNIZATION_RESULTS}`)
          return immunizations.filter(Is.immunization.internationalPrevalence);
      }
    }
  }

}());
