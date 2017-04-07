/**
 * Service to convert retrieved FHIR object into front-end UI data-model.
 */
(function () {
'use strict';
  const ICON_ERROR = require('../ICON_ERROR.js');
  module.exports = FhirRecordConverter;

  function FhirRecordConverter (
    $q,
    Endpoint,
    Agent, Disease, Immunization, Lot, Patient, Recommendation, Trade,
    ICON_ERROR
  ) {
/* Private constants **********************************************************/

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


/* Private utility functions **************************************************/

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
        (healthCardNumber.length > 0) ? healthCardNumber[0] : ``,
        (oiid.length > 0) ? oiid[0] : ``,
        patient.resource.gender
      );
    };

    let createImmunizationUsing = (practitionerDictionary) => (immunization) => {
                                    let newPractitioner = (immunization.resource.performer)
                                                              ? practitionerDictionary[immunization.resource.performer.reference]
                                                              : ``;
                                    let newLot = (immunization.resource.lotNumber)
                                                              ? new Lot(immunization.resource.lotNumber)
                                                              : new Lot();
                                    return new Immunization(
                                      immunization.resource.date.substring(0, 10),
                                      false,
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



/* Private logic functions ****************************************************/

    function fhirParse (data) {
      let candidateRecommendations = data.entry.filter(isResourceType(type.RECOMMENDATION));
      let fhir = {
        patient:          data.entry.filter(isResourceType(type.PATIENT))[0],
        immunizations:    data.entry.filter(isResourceType(type.IMMUNIZATION)),
        recommendations:  (candidateRecommendations.length) ? candidateRecommendations[0].resource.recommendation : [],
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
                                     let prefixText = `${(p.resource.name.prefix) ? ` ${p.resource.name.prefix.join(` `)}` : ``}`;
                                     let sufffixText = `${(p.resource.name.suffix) ? ` ${p.resource.name.suffix.join(` `)}` : ``}`;
                                     let practitionerText = `${prefixText}${p.resource.name.text}${sufffixText}`

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
      const outcome = {
        POSITIVE: `Bundle`,
        NEGATIVE: `OperationOutcome`
      };

      if (!data || !data.resourceType) throw new Error(ICON_ERROR.RETRIEVAL.FHIR_INVALID);

      // The content of the FHIR message is a "Bundle" _WITHOUT_ an "OperationOutcome".
      if (
          data.resourceType === outcome.POSITIVE
       && data.entry[0].resource.resourceType !== outcome.NEGATIVE
      ) {
        // Positive case, FHIR will be converted.
        return fhirParse(data);
      }
      // The content of the FHIR message is a "Bundle" _WITH_ an "OperationOutcome".
      else if (
           data.resourceType === outcome.POSITIVE
        && data.entry[0].resource.resourceType === outcome.NEGATIVE
      ) {
        switch (data.entry[0].resource.issue[0].code) {
          case `suppressed`:
            throw new Error(ICON_ERROR.RETRIEVAL.OUTCOME_CONSENT_BLOCK);
            break;

          case `not-found`:
            throw new Error(ICON_ERROR.RETRIEVAL.OUTCOME_BAD_OIID);
            break;

          default:
            throw new Error(ICON_ERROR.RETRIEVAL.OUTCOME_OTHER);
            break;
        }
      }
      // The content of the FHIR message is an "OperationOutcome" only, _WITHOUT_ "Entries".
      else if (data.resourceType === outcome.NEGATIVE) {
        if (
             data.issue[0].code === `required`
          && data.issue[0].location[0] == `PIN`
        ) {
          // NOTE: Best effort to detect this error with DHIR Simulator response data.
          // TODO: Confirm/refactor if necessary when actual DHIR endpoint is up and running.
          throw new Error(ICON_ERROR.RETRIEVAL.OUTCOME_BAD_PIN);
        }
      }
      else {
        throw new Error(ICON_ERROR.RETRIEVAL.OUTCOME_UNKOWN);
      }
    }

    function populateConvertedData (record) {
      let immunizationSnomeds = record.retrievedImmunizations.map(immunization => immunization.vaccineCode);
      let diseaseSnomeds = record.recommendations.map(recommendation => recommendation.vaccineCode);

      let immunizationDictionary = {};
      let diseaseDictionary = {};

      let immunizationQuery = (immunizationSnomeds.length) ? immunizationSnomeds.join(`,`) : `0`;
      let diseaseQuery = (diseaseSnomeds.length) ? diseaseSnomeds.join(`,`) : `0`;

      return $q.all({
        immunizations:  Endpoint.batchLookupAgentTrade(immunizationQuery),
        diseases:       Endpoint.batchLookupDiseases(diseaseQuery),
      })
      .then((data) => {
        data.immunizations.forEach((i) => {
          immunizationDictionary[i.agent.snomed] = i;
          if (i.trade.snomed) immunizationDictionary[i.trade.snomed] = i;
        });
        data.diseases.forEach((d) => { diseaseDictionary[d.snomed] = d; });
        return data;
      })
      .then((data) => {
        let populateAgentTrade = (immunization) => {
                                    let populatedImmunization = immunizationDictionary[immunization.vaccineCode];
                                    let newImmunization = immunization.clone();
                                    newImmunization.agent = populatedImmunization.agent;
                                    newImmunization.trade = populatedImmunization.trade;
                                    return newImmunization;
                                  };
        let populateDisease = (recommendation) => {
                                    let newRecommendation = recommendation.clone();
                                    newRecommendation.disease = diseaseDictionary[newRecommendation.vaccineCode];
                                    return newRecommendation;
                                  };

        return {
          patient:                record.patient,
          retrievedImmunizations: record.retrievedImmunizations.map(populateAgentTrade),
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
