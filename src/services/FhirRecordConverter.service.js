/**
 * Service to convert retrieved FHIR object into front-end UI data-model.
 */
(function () {
'use strict';
  module.exports = FhirRecordConverter;

  function FhirRecordConverter (
    $q,
    Endpoint,
    Agent, Disease, Immunization, Lot, Patient, Recommendation, Trade
  ) {
/* Private ********************************************************************/

    const type = {
      PATIENT:        `Patient`,
      IMMUNIZATION:   `Immunization`,
      RECOMMENDATION: `ImmunizationRecommendation`,
      PRACTITIONER:   `Practitioner`,
    };

    const identifierSystem = {
      HCN:  `https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn`,
      OIID: `https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-panorama-immunization-id`,
    };

    let isResourceType = (desiredType) => (entry) => {
      return (entry.resource
              && entry.resource.resourceType
              && entry.resource.resourceType === desiredType);
    };

    let createPatient = (patient) => {
      let healthCardNumber = patient.resource.identifier
                              .filter(identifier => identifier.system === identifierSystem.HCN)
                              .map(identifier => identifier.value);

      let oiid = patient.resource.identifier
                              .filter(identifier => identifier.system === identifierSystem.OIID)
                              .map(identifier => identifier.value);

      return new Patient(
        patient.resource.name[0].given[0] || ``,
        patient.resource.name[0].given.slice(1).join(` `) || ``,
        patient.resource.name[0].family.join(` `) || ``,
        patient.resource.birthDate,
        ``, /* Patient.schoolOrDayCare */
        ``, /* Patient.schoolOrDayCareIdentifier */
        (!!healthCardNumber.length > 0) ? healthCardNumber[0] : ``,
        (!!oiid.length > 0) ? oiid[0] : ``,
        patient.resource.gender
      );
    };

    let createImmunizationUsing = (practitionerDictionary) => (immunization) => {
      let newPractitioner = (!!immunization.resource.performer)
                                ? practitionerDictionary[immunization.resource.performer.reference]
                                : ``;
      let newLot = (!!immunization.resource.lotNumber)
                                ? new Lot(immunization.resource.lotNumber)
                                : new Lot();

      let dateIsEstimated = (!!immunization.resource._date
                                ? immunization.resource._date.extension[0].valueBoolean
                                : false);

      return new Immunization(
        immunization.resource.date.substring(0, 10),
        dateIsEstimated,
        null,
        null,
        newPractitioner,
        ``,
        newLot,
        immunization.resource.vaccineCode.coding[0].code
      );
    };

    let createRecommendation = (recommendation) => {
      return new Recommendation(
        recommendation.date.substring(0, 10),
        recommendation.forecastStatus.coding[0].code.toUpperCase(),
        new Disease(),
        recommendation.vaccineCode.coding[0].code
      );
    };

    function fhirParse (data) {
      let candidateRecommendations = data.entry.filter(isResourceType(type.RECOMMENDATION));
      let fhir = {
        patient:          data.entry.filter(isResourceType(type.PATIENT))[0],
        immunizations:    data.entry.filter(isResourceType(type.IMMUNIZATION)),
        recommendations:  (!!candidateRecommendations.length) ? candidateRecommendations[0].resource.recommendation : [],
      };

      // Pluck snomeds from FHIR into lists of unique values for database lookups.
      let uniqueImmunizationSnomeds = fhir.immunizations
                                      .map(immunization => immunization.resource.vaccineCode.coding[0].code);
      let uniqueDiseaseSnomeds = fhir.recommendations
                                      .map(recommendation => recommendation.vaccineCode.coding[0].code);

      // Create dictionaries for practitioners, immunizations, and diseases.
      let practitionerDictionary = data.entry
                                   .filter(isResourceType(type.PRACTITIONER))
                                   .reduce((practitioners, p) => {
                                     let prefixText =     `${(!!p.resource.name[0].prefix) ? `${p.resource.name[0].prefix.join(` `)} ` : ``}`;
                                     let givenNameText =  `${(!!p.resource.name[0].given) ? p.resource.name[0].given.join(` `) : ``}`;
                                     let familyNameText = `${(!!p.resource.name[0].family) ? ` ${p.resource.name[0].family.join(` `)}` : ``}`;
                                     let sufffixText =    `${(!!p.resource.name[0].suffix) ? ` ${p.resource.name[0].suffix.join(` `)}` : ``}`;

                                     let practitionerText = `${prefixText}${givenNameText}${familyNameText}${sufffixText}`

                                     practitioners[`${p.resource.resourceType}/${p.resource.id}`] = practitionerText;
                                     return practitioners;
                                   }, {});

      return {
        patient:                createPatient(fhir.patient),
        retrievedImmunizations: fhir.immunizations.map(createImmunizationUsing(practitionerDictionary)),
        recommendations:        fhir.recommendations.map(createRecommendation),
      };
    }


/* Public *********************************************************************/

    function convert (data) {
      const POSITIVE_RESOURCE_TYPE = `Bundle`;
      const NEGATIVE_OPERATION_OUTCOME = `OperationOutcome`;

      const hasData = !!data;
      const hasResourceType = (
           !!data
        && !!data.resourceType
      );
      const hasEntryResourceType = (
           !!data
        && !!data.entry
        && !!data.entry.length
        && !!data.entry[0].resource
        && !!data.entry[0].resource.resourceType
      );
      const isPositiveFhirResponse = (
           hasData
        && hasResourceType
        && hasEntryResourceType
        && data.resourceType === POSITIVE_RESOURCE_TYPE
        && data.entry[0].resource.resourceType !== NEGATIVE_OPERATION_OUTCOME
      );

      if (isPositiveFhirResponse) return fhirParse(data);
      else throw new Error(`FHIR Invalid, cannot parse retrieval`);
    }

    function populateConvertedData (record) {
      let immunizationSnomeds = record.retrievedImmunizations.map(immunization => immunization.vaccineCode);
      let diseaseSnomeds = record.recommendations.map(recommendation => recommendation.vaccineCode);

      let immunizationDictionary = {};
      let diseaseDictionary = {};

      let immunizationQuery = (!!immunizationSnomeds.length) ? immunizationSnomeds.join(`,`) : `0`;
      let diseaseQuery = (!!diseaseSnomeds.length) ? diseaseSnomeds.join(`,`) : `0`;

      return $q.all({
        immunizations:  Endpoint.batchLookupAgentTrade(immunizationQuery),
        diseases:       Endpoint.batchLookupDiseases(diseaseQuery),
      })
      .then((data) => {
        data.immunizations.forEach((i) => {
          immunizationDictionary[i.agent.snomed] = i;
          if (!!i.trade.snomed) immunizationDictionary[i.trade.snomed] = i;
        });
        data.diseases.forEach((d) => { diseaseDictionary[d.snomed] = d; });
        return data;
      })
      .then((data) => {
        let populateAgentTrade = (immunization) => {
                                    let populatedImmunization = immunizationDictionary[immunization.vaccineCode];
                                    let newImmunization = immunization.clone();
                                    if(populatedImmunization) {
                                      newImmunization.agent = populatedImmunization.agent;
                                      newImmunization.trade = populatedImmunization.trade;
                                    } else {
                                      // this immunzation was not found in our Dictionary so
                                      // display the agent as 'Other' to the user
                                      // .trade can remain empty
                                      newImmunization.agent.shortName = 'Other/autre - Contact your Public Health Unit / Communiquez avec votre bureau de santé publique local';
                                      newImmunization.agent.name = 'Other/autre';
                                    }
                                    return newImmunization;
                                  };
        let populateDisease = (recommendation) => {
                                    let newRecommendation = recommendation.clone();
                                    newRecommendation.disease = diseaseDictionary[newRecommendation.vaccineCode];
                                    return newRecommendation;
                                  };

        return {
          patient:                record.patient,
          retrievedImmunizations: record.retrievedImmunizations.map(populateAgentTrade).filter(v => v), // drop undefined values
          recommendations:        record.recommendations.map(populateDisease),
        };
      });
    }


/* Interface ******************************************************************/

    return {
      convert:                convert,
      populateConvertedData:  populateConvertedData,
    };

  }

}());
