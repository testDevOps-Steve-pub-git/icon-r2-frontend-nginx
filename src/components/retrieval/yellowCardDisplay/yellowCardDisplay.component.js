(function () {
'use strict';

  module.exports = {
    controller: yellowCardDisplayController,
    templateUrl: './components/retrieval/yellowCardDisplay/yellowCardDisplay.template.html',
  };

  yellowCardDisplayController.$inject = ['$q', '$translate', 'Endpoint', 'ImmunizationGroup', 'DISEASE_YC_ORDER', 'By', 'GroupsOf', 'ImmunizationRecordService'];
  function yellowCardDisplayController ($q, $translate, Endpoint, ImmunizationGroup, DISEASE_YC_ORDER, By, GroupsOf, ImmunizationRecordService) {
    this.$onInit = () => {
      let retrievedImmunizations = ImmunizationRecordService.getRetrievedImmunizations();
      let retrievedDiseases = retrievedImmunizations
                              .reduce((diseases, d) => {
                                diseases.concat(d);
                                return diseases;
                              }, [])
                              .map(d => d.snomed);
      let yellowCardSnomeds = Object.keys(DISEASE_YC_ORDER)
                              .filter(d => DISEASE_YC_ORDER[d] < DISEASE_YC_ORDER.DEFAULT);

      this.yellowCardRows = GroupsOf.immunization.byDate(retrievedImmunizations)
                            .map(group => {
                              return {
                                isDetailView:   false,
                                date:           group[0].date,
                                diseases:       group
                                                .reduce((diseases, immunization) => {
                                                  return diseases.concat(immunization.agent.diseases);
                                                }, [])
                                                .map(disease => disease.snomed)
                                                .reduce((snomeds, s) => {
                                                  if (snomeds.indexOf(s) < 0) snomeds.push(s);
                                                  return snomeds;
                                                }, []),
                                immunizations:  group,
                              }
                            });

      // Populated asynchronously using DB lookups.
      // TODO: Hard code this data as a constant to avoid latency from uneccesary
      //       round trips lookups, or memoize lookup results in service, time permitting.
      this.yellowCardHeaders = [];
      Endpoint
      .batchLookupDiseases(yellowCardSnomeds.join(`,`))
      .then(yellowCardDiseases => yellowCardDiseases.concat(retrievedDiseases))
      .then(diseases => diseases.sort(By.disease.snomed.ycOrderAsc))
      .then(sortedDiseases => this.yellowCardHeaders = sortedDiseases)
    }
  }

}());
