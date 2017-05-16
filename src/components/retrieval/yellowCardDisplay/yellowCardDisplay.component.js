(function () {
'use strict';

  module.exports = {
    controller: yellowCardDisplayController,
    templateUrl: './components/retrieval/yellowCardDisplay/yellowCardDisplay.template.html',
  };

  yellowCardDisplayController.$inject = ['$q', '$translate', 'Endpoint', 'ImmunizationGroup', 'DISEASE_YC_ORDER', 'By', 'GroupsOf', 'ImmunizationRecordService'];
  function yellowCardDisplayController ($q, $translate, Endpoint, ImmunizationGroup, DISEASE_YC_ORDER, By, GroupsOf, ImmunizationRecordService) {
    this.$onInit = () => {
      let { firstName, lastName } = ImmunizationRecordService.getPatient();
      this.patientName = `${firstName} ${lastName}`;

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
                                immunizations:  group
                                                .map((immunization) => {
                                                  immunization.diseaseSnomeds = immunization.agent.diseases
                                                                                .map(disease => disease.snomed);
                                                  return immunization;
                                                }),
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
      .then(sortedDiseases => this.yellowCardHeaders = sortedDiseases);

      this.isImmunizationOther = (immunization) => {
        return !immunization.agent.diseases
               .filter(disease => !!DISEASE_YC_ORDER[disease.snomed])
               .length;
      }

      this.doesRowContainOther = (row) => {
        // if there are no diseases, it means we had an agent with
        // a snomed that wasn't found so treat it as 'other'
        return row.diseases.length === 0 ||
               !!row.diseases
               .filter(disease => !DISEASE_YC_ORDER[disease])
               .length;
      }
    }


    /**
     * For the scroll buttons, to scroll left and right
     * 219 is the current width of the yellow card display
     * See https://github.com/oblador/angular-scroll for API
     */
    let container = angular.element(document.getElementById('icon-yc-table-container'));
    let currentPos = 0;
    this.scrollLeft = ()=> {
      currentPos = container.scrollLeft();
      return container.duScrollTo(currentPos - 200, 0, [500])
        .catch((error)=>{ });
    };

    this.scrollRight = ()=> {
      currentPos = container.scrollLeft();
      return container.duScrollTo(currentPos + 200, 0, [500])
        .catch((error)=>{});
    }
  }

}());
