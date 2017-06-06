/**
 * Service to create FHIR object from front-end UI data-model, suitable for immunization record submission.
 */
(function () {
'use strict';
  module.exports = ImmunizationRecordConverter;

  function ImmunizationRecordConverter (
    Multitenancy, TokenHandler, ImmunizationRecordService, GatingQuestionService,
    $translate, moment,
    Patient, Immunization, Agent, Trade, Disease
  ) {
/* Private ********************************************************************/
    // NOTE: these all get set asynchronously during execution of .convert(...)
    let sessionToken = null;
    let transactionToken = null;
    let multitenancy = null;
    /* Gating questions */
    let didReceivePHULetter = null;
    let allImmunizationsFromOntario = null;

    /**
     * Creates a patient FHIR object.
     * @param {ImmunizationRecord} record - the immunization record containing the patient info
     * @param {String} patientId - identifier for the patient
     * @param {String} schoolId - identifier for the school / daycare
     * @returns {Object}
     */
    function createPatient (record, patientId, schoolId) {
      let patient = record.getPatient();
      let address = record.getAddress();

      const ADDRESS_EXTENSION_URLS = {
        streetNumber:     'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber',
        streetName:       'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetName',
        streetType:       'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameType',
        streetDirection:  'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-direction',
        unitNumber:       'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-unitID',
        postBox:          'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-postBox',
        ruralRoute:       'https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-address-rural-route',
        station:          'https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-address-station',
        retailPostOffice: 'https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-address-retail-postal-office',
      };

      // Create an object for each FHIR address extension which is non-empty.
      let addressExtension = Object.keys(address)
          .filter(key => { return address[key] !== '' && ADDRESS_EXTENSION_URLS[key] })
          .map(key => { return {
                        'url': ADDRESS_EXTENSION_URLS[key],
                        'valueString': address[key]
                      }});

      let patientResource = {
        'resourceType': 'Patient',
        'id': patientId,
        'name': [
          {
            'use':    'official',
            'family': [ patient.lastName ],
            'given':  (patient.middleName === '') ? [patient.firstName] : [patient.firstName, patient.middleName]
          }
        ],
        'gender':     patient.gender.toLowerCase(),
        'birthDate':  moment(patient.dateOfBirth).format('YYYY-MM-DD')
      };

      if(schoolId){
        patientResource.contact = [
          {
            'organization': {
              'reference': `#${schoolId}`
            }
          }
        ]
      }

      let patientResourceIdentifier = [];
      if (patient.healthCardNumber) patientResourceIdentifier.push({
                                      'use':    'official',
                                      'system': 'https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn',
                                      'value':  patient.healthCardNumber
                                    });

      if (patient.oiid) patientResourceIdentifier.push({
                          'use':    'secondary',
                          'system': 'https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-panorama-immunization-id',
                          'value':  patient.oiid
                        });

      if (patientResourceIdentifier.length) {
        patientResource.identifier = patientResourceIdentifier;
      }

      let isAddressPopulated = (
           address.city
        && address.province
        && address.postalCode
        && addressExtension.length
      );

      // NOTE: FHIR spec in v2 makes address an optional part of the Patient resource.
      if (isAddressPopulated) {
        patientResource.address = [
          {
            'extension':  addressExtension,
            'use':        'home',
            'line':       [ address.line2 ],
            'city':       address.city,
            'state':      address.province,
            'postalCode': address.postalCode
          }
        ];
      }

      return patientResource;
    }

    /**
     * Creates a submitter FHIR object.
     * @param {ImmunizationRecord} record - the immunization record containing the submitter info
     * @param {String} patientId - identifier for the patient
     * @param {String} submitterId - identifier for the submitter / related person
     * @returns {Object}
     */
    function createSubmitter (record, patientId, submitterId) {
      let submitter = record.getSubmitter();

      // Assemble the telecom object, conditionally include the 2nd phone number when present.
      let telecom = [{
        'system': 'phone',
        'value':  (submitter.phone1Ext !== '')
                      ? `${submitter.phone1Number} x${submitter.phone1Ext}`
                      : submitter.phone1Number,
        'use':    'home'
      }];
      if (submitter.phone2Number !== '') telecom.push({
            'system': 'phone',
            'value':  (submitter.phone2Ext !== '')
                          ? `${submitter.phone2Number} x${submitter.phone2Ext}`
                          : submitter.phone2Number,
            'use':    'home'
          });
      if (submitter.email !== '') telecom.push({
            'system': 'email',
            'value':  submitter.email
          });

      return {
        'resourceType': 'RelatedPerson',
        'id': submitterId,
        'patient': { 'reference': `#${patientId}` },
        'relationship': {
          'coding': [
            {
              'system': 'http://hl7.org/fhir/v3/RoleCode',
              'code': submitter.relationshipToPatient
            }
          ]
        },
        'name': {
          'family': [ submitter.lastName ],
          'given':  [ submitter.firstName ]
        },
        'telecom': telecom
      };
    }

    /**
     * Creates a Public Health Unit (PHU) FHIR object.
     * @param {ImmunizationRecord} record - the immunization record containing the PHU info
     * @param {String} phuId - identifier for the PHU
     * @returns {Object}
     */
    function createPhu (record, phuId) {
      let { PHIX_PHU_CODE, PHIX_PHU_NAME } = Multitenancy.getPhuKeys();

      return {
        'resourceType': 'Organization',
        'id': phuId,
        'identifier': [
          {
            'system': 'https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-panorama-phu-id',
            'value': multitenancy.PHIX_PHU_CODE
          }
        ],
        'name': multitenancy.PHIX_PHU_NAME
      };
    }

    /**
     * Creates a school / daycare FHIR object.
     * @param {ImmunizationRecord} record - the immunization record containing the patient info
     * @param {String} schoolId - identifier for the school / daycare
     * @returns {Object}
     */
    function createSchool (record, schoolId) {
      let patient = record.getPatient();

      return {
        'resourceType': 'Organization',
        'id': schoolId,
        'identifier': [
          {
            'system': 'https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-panorama-school-id',
            'value': patient.schoolOrDayCareIdentifier
          }
        ],
        'name': patient.schoolOrDayCare
      };
    }

    /**
     * Creates a collection of immunization FHIR objects.
     * @param {ImmunizationRecord} record - the immunization record containing the immunization info
     * @param {String} patientId - identifier for the patient
     * @returns {Object}
     */
    function createImmunizations (record, patientId) {
      return record
             .getNewImmunizations()
             .map(patientImmunizationToFhir(patientId)); // Convert immunizations to FHIR
    }

    /**
     * Creates a function used to map Immunization objects into FHIR objects.
     * @param {String} patientId - identifier for the patient (partially applied to returned function)
     * @returns {Object}
     */
    function patientImmunizationToFhir (patientId) {
      return (imm, index, immunizations) => {
        const IMMUNIZATION_SNOMED = (!!imm.trade.snomed)
                  ? imm.trade.snomed
                  : imm.agent.snomed;
        const IMMUNIZATION_DISPLAY_NAME = (!!imm.trade.name)
                  ? `${imm.agent.name} (${imm.trade.name})`
                  : `${imm.agent.name}`;

        let immunization = {
          'resourceType': 'Immunization',
          'id': `Immunization/${index + 1}`,
          'status': 'completed',
          'date': moment(imm.date).format('YYYY-MM-DD'),
          '_date': {
            'extension': [{
              'url': 'https://wsgateway.prod.ehealthontario.ca/API/FHIR/Immunizations/v1/StructureDefinition/ca-on-estimated',
              'valueBoolean': imm.isDateApproximate
            }]
          },
          'vaccineCode': {
            'coding': [{
              'system':   'http://snomed.info/sct',
              'code':     IMMUNIZATION_SNOMED,
              'display':  IMMUNIZATION_DISPLAY_NAME
            }],
            'text': IMMUNIZATION_DISPLAY_NAME
          },
          'patient': { 'reference': `#${patientId}` },
          'wasNotGiven': false,
          'reported': true,
          'lotNumber': imm.lot.number,
          'expirationDate' : imm.lot.expiry,
          'note': [{ 'text': imm.provider }]
        };

        if (allImmunizationsFromOntario === $translate.instant('immunizationGating.YES')) {
          immunization.location = { display: 'Canada, Ontario' };
        }

        return immunization;
      };
    }

    /**
     * Creates an identifier FHIR object (used for logging / identifying transaction).
     * @param {ImmunizationRecord} record - the immunization record containing the session info
     * @returns {Object}
     */
    function createIdentifier (record) {
      return {
        'system': 'https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-panorama-imm-submission-id',
        'value':  transactionToken.decoded.txId,
      };
    }


/* Public *********************************************************************/

    /**
     * Generates a post request from model data used in front-end.
     * @param {ImmunzationRecordSubmission} immunzationRecordSubmission - the complete submission data
     * @param {string} submissionEndpoint - the URL for the submission endpoint used for POST
     * @returns {object} - the assembled FHIR object
     */
    function convertToFhir (record) {
      if (!record) throw new Error('A valid ImmunizationRecordService is required to convert to FHIR.');

      let patient = record.getPatient();
      let isSchoolInfoPopulated = (
           !!patient.schoolOrDayCare
        && !!patient.schoolOrDayCareIdentifier
      );

      const PHU_ID =        'Organization/2';
      const PATIENT_ID =    'Patient/1';
      const SCHOOL_ID =     isSchoolInfoPopulated ? 'Organization/1' : null;
      const SUBMITTER_ID =  'RelatedPerson/1';

      let numberOfImmunizations = record.getNewImmunizations()
          .map((_, index) => ({
            'contentReference': { 'reference':  `#Immunization/${index + 1}` }
          }));

      let communication = {
        'resourceType': 'Communication',
        'meta': { 'lastUpdated': new Date().toISOString() },
        'contained': [
          createPatient(record, PATIENT_ID, SCHOOL_ID),
          createSubmitter(record, PATIENT_ID, SUBMITTER_ID),
          createPhu(record, PHU_ID)
        ].concat(
          createImmunizations(record, PATIENT_ID)
        ),
        'identifier': [ createIdentifier(record) ],
        'sender': { 'reference': `#${SUBMITTER_ID}` },
        'recipient': [ { 'reference': `#${PHU_ID}` } ],
        'payload': numberOfImmunizations,
        'status': 'completed',
        'sent': new Date().toISOString(),
        'received': new Date().toISOString(),
        'subject': { 'reference': `#${PATIENT_ID}` }
      };

      // Only add the school if the submission has that info populated.
      if (isSchoolInfoPopulated) {
        communication.contained.push(createSchool(record, SCHOOL_ID));
      }

      // If user received a letter from a PHU, populate that info
      if (didReceivePHULetter === $translate.instant('immunizationGating.YES')) {
        communication.reason = [{ text : 'Letter From PHU' }];
      }

      return communication;
    }

    function convert (record) {
      return TokenHandler
             .getSessionToken()
             .then(token => { sessionToken = token; })
             .then(TokenHandler.getTransactionToken)
             .then(token => { transactionToken = token; })
             .then(Multitenancy.getPhuKeys)
             .then(phuKeys => { multitenancy = phuKeys; })
             .then( ()=> {
               let gatingQuestions = GatingQuestionService.getGatingChoices();
               didReceivePHULetter = gatingQuestions.question1Choice;
               allImmunizationsFromOntario = gatingQuestions.question2Choice;
             })
             .then(() => { return convertToFhir(record); });
    }

    /**
     * Creates a well-formed POST object, with data payload consisting of a FHIR object.
     * @param {ImmunizationRecordSubmission} record - the immunization record used to create the FHIR object
     * @param {String} endpoint - the url for the POST submission endpoint
     */
    function convertToPost (record, endpoint) {
      return {
        'url': endpoint,
        'data': convertToFhir(record),
      };
    }

    function immunizationFromJson (immunization) {
      let newImmunization = Object.assign(new Immunization(), immunization);
      newImmunization.agent = agentFromJson(immunization.agent);
      newImmunization.trade = tradeFromJson(immunization.trade);
      return newImmunization;
    }

    function agentFromJson (agent) {
      let newAgent = Object.assign(new Agent(), agent);
      newAgent.diseases = agent.diseases.map(diseaseFromJson);
      return newAgent;
    }

    function tradeFromJson (trade) {
      return ((trade === null)
                ? new Trade()
                : Object.assign(new Trade(), trade));
    }

    function diseaseFromJson (disease) {
      return Object.assign(new Disease(), disease);
    }

    function convertFromJson (record) {
      let patient = new Patient();
      ImmunizationRecordService.setPatient(Object.assign(patient, record.patient));

      let retrievedImmunizations = record.retrievedImmunizations
                                         .map(immunizationFromJson);
      ImmunizationRecordService.setRetrievedImmunizations(retrievedImmunizations);

      let recommendations = record.recommendations
                                         .map(diseaseFromJson);
      ImmunizationRecordService.setRecommendations(recommendations);
    }

/* Public interface for this service. *****************************************/
    return {
      convertToFhir:    convertToFhir,
      convertToPost:    convertToPost,
      convert:          convert,
      convertFromJson:  convertFromJson,
    };
  }

}());
