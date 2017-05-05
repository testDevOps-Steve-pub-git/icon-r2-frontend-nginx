(function () {
'use strict';
  module.exports = Endpoint;

  const Crypto = require('crypto-js');

  function Endpoint (
    $http, $q, $translate,
    ImmunizationRecordService, SessionHandler, TokenHandler,
    Agent, Disease, Immunization, Lot, Trade,
    ICON_API
  ) {
/* Private ********************************************************************/

    /**
     * Generalized encapsulation of XHR, with curried parameters.
     * @param {String} method - indicates request method ("GET", or "POST")
     * @param {function?} getHeaders - optional async function returning a Promise resolving headers
     * @param {function?} getData - optional function returning data/body
     * @param {function} getUrl - function returning a URL string
     * @param {String?} query - optional query (passed to getUrl function)
     * @returns {Promise}
     */
    const xhr = (method) => (getHeaders) => (getData) => (getUrl) => (query) => {
      let request = {
        method: method,
        url:    getUrl(query),
      };

      // If there is a getData, then append output to the request.
      if (getData) request.data = getData();

      // If there is a getHeaders, then append output to the request before returning.
      if (getHeaders) return getHeaders()
                            //  .then(SessionHandler.extendTransactionTime)
                             .then(headers => request.headers = headers)
                             .then(() => $http(request))
                             .then(response => response.data);
      // Otherwise return without headers (example: PostgREST lookups).
      else return $http(request)
                  .then(response => response.data);
    }

    /**
     * Creates a header including session token.
     * @returns {Promise} - resolves to the assembled header object
     */
    const headersWithSession = () => {
      let headers = {};

      return TokenHandler
             .refreshSessionToken()
             .then((token) => { headers['session-token'] = token.encoded })
             .then(SessionHandler.extendTransactionTime)
             .then(() => { return headers });
    }

    /**
     * Creates a header including content type, session token, and transaction token.
     * @returns {Promise} - resolves to the assembled header object
     */
    const headersWithSessionTransactionJson = () => {
      let headers = { 'Content-Type': 'application/json' };

      return TokenHandler
             .refreshSessionToken()
             .then((token) => { headers['session-token'] = token.encoded })
             .then(TokenHandler.refreshTransactionToken)
             .then((token) => { headers['submission-token'] = token.encoded })
             .then(SessionHandler.extendTransactionTime)
             .then(() => { return headers });
    }

    const getWithHeaders = xhr('GET')
                              (headersWithSessionTransactionJson)
                              (/* Omit data */);

/* Public *********************************************************************/

    const batchLookupDiseases = (snomeds) => {
      return getWithHeaders(() => `${ICON_API.LOOKUP_DISEASES}?filter[snomed]=${snomeds || ``}`)()
             .then((diseases) => {
               let lang = $translate.use();
               return diseases
                      .map(d => { return new Disease(d.longName[lang], `${d.snomed}` ) });
             });
    };

    const batchLookupAgentTrade = (snomeds) => {
      return getWithHeaders(() => `${ICON_API.LOOKUP_AGENT_TRADE}?filter[snomed]=${snomeds || ``}`)()
             .then(imms => imms.map(immunizationFromJson));
    };

    const lookupLots = (snomed) => {
      return getWithHeaders(lotSnomed => `${ICON_API.LOOKUP_LOTS}?filter[snomed]=${lotSnomed || ``}`)(snomed)
            .then(lots => {
              if(!!lots[0].lots && lots.length == 1)
                return lots[0].lots.map(lot => new Lot(lot.lotNumber, lot.expiry))
              else
                  return [];
            })
            .catch((error)=>{console.warn(error)})
    };

    const immunizationFromJson = (json) => {
      let lang = $translate.use();
      let newAgent = new Agent(
                            `${json.agent.snomed}`,
                            json.agent.longName[lang],
                            json.agent.shortName[lang],
                            (json.agent.diseases)
                                ? json.agent.diseases.map(d => new Disease(d.longName[lang], `${d.snomed}`))
                                : [],
                            '',
                            '',
                            json.agent.prevalenceIndex,
                            json.agent.orderedDiseases[lang]
                          );
      let newTrade = (json.trade)
                        ? new Trade(
                                `${json.trade.snomed}`, // snomed,
                                json.trade.manufacturer, // manufacturer,
                                json.trade.longName[lang], // name,
                                '', // shortName,
                                json.trade.prevalenceIndex // prevalenceIndex
                              )
                        : new Trade();

      return new Immunization(
                    '',
                    false,
                    newAgent,
                    newTrade,
                    '',
                    ''
                  );
    }

    const lookupImmunizations = (imm) => {
      return getWithHeaders((immQuery) => {
               let lang = $translate.use().toLowerCase();
               return `${ICON_API.LOOKUP_IMMUNIZATIONS}?filter[immun]=${immQuery || ''}&filter[lang]=${lang}`;
             })(imm)
             .then(imms => imms.map(immunizationFromJson));
    };

    const translatePound = (queryString) => {
      return queryString.replace('#', '%23')
    };

    const getAddress = getWithHeaders((postalQuery) => {
      return `${ICON_API.ADDRESS}?filter[postalCode]=${postalQuery || ''}`;
    })

    const getCity = getWithHeaders((cityQuery) => {
      return `${ICON_API.CITY}?filter[city]=${cityQuery || '*'}`;
    });

    const getDisease = getWithHeaders((diseaseQuery) => {
      return `${ICON_API.DISEASE}?filter[iconDisplay]=${diseaseQuery || ''}`;
    });

    const getSchoolOrDaycare = getWithHeaders((schoolQuery) => {
      return `${ICON_API.SCHOOL}?filter[name]=${translatePound(schoolQuery) || '*'}`;
    });

    const getVaccine = getWithHeaders((vaccineQuery) => {
      return `${ICON_API.VACCINE}?filter[iconDisplay]=${vaccineQuery || ''}`;
    });

    const submitImmunizationRecord = (fhirRecordData) => {
      return xhr('POST')
                (headersWithSessionTransactionJson)
                (() => fhirRecordData)
                (() => ICON_API.SUBMIT_IMMUNIZATIONS)
                (/* Omit query */);
    }

    const headersWithSessionOiidPin = (oiid, pin) => {
      return headersWithSession()
             .then((headers) => {
               const sha256 = text => Crypto.SHA256(text).toString();
               const base64 = text => Crypto
                                      .enc.Utf8.parse(text)
                                      .toString(Crypto.enc.Base64);

               let obfuscatedPin = base64(JSON.stringify({ pin: sha256(pin) }));
               headers['OIID'] = oiid;
               headers['immunizations-context'] = obfuscatedPin;
               headers['lang'] = $translate.use().toLowerCase();

               return headers;
             });
    }

    const retrieveImmunizationRecord = (oiid, pin) => {
      const relationshipCodeDictionary = {
        'ONESELF':  'Self',
        'GUARD':    'Parent\/Guardian',
      };
      let relationshipCode = ImmunizationRecordService.getSubmitter().relationshipToPatient;
      let relationshipToPatient = relationshipCodeDictionary[relationshipCode];
      let formattedOiid = oiid.toUpperCase();

      return xhr('GET')
                (() => headersWithSessionOiidPin(formattedOiid, pin))
                (/* Omit data */)
                (() => `${ICON_API.RETRIEVE_IMMUNIZATION_RECORD}?relationshipToClient=${relationshipToPatient}`)
                (/* Omit query */);
    }

    const postAnalyticsLog = (analyticsData) => {
      return xhr('POST')
                (headersWithSessionTransactionJson)
                (() => analyticsData)
                (() => ICON_API.TRACKING)
                (/* Omit query */);
    };

    const generatePdf = (pdfData) => {
      let request = {
        method:       'POST',
        url:          ICON_API.GENERATE_PDF,
        responseType: 'arraybuffer',
        data:         JSON.stringify(pdfData),
      };

      return headersWithSessionTransactionJson()
             .then(headers => request.headers = headers)
             .then(SessionHandler.extendTransactionTime)
             .then(() => $http(request))
             .then(response => response.data)
    };


/* Interface ******************************************************************/

    return {
      // Old PostgREST lookup APIs
      // TODO: Remove these once factored out
      getAddress:         getAddress,
      getCity:            getCity,
      getDisease:         getDisease,
      getSchoolOrDaycare: getSchoolOrDaycare,
      getVaccine:         getVaccine,

      // New v2 PostgREST lookup APIs
      batchLookupDiseases:      batchLookupDiseases,
      batchLookupAgentTrade:    batchLookupAgentTrade,
      lookupImmunizations:      lookupImmunizations,
      lookupLots:               lookupLots,

      generatePdf:  generatePdf,

      retrieveImmunizationRecord:  retrieveImmunizationRecord,
      submitImmunizationRecord:    submitImmunizationRecord,

      postAnalyticsLog: postAnalyticsLog,
    };
  }

}());
