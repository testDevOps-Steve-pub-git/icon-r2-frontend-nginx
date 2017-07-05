const Crypto = require('crypto-js');

/* @ngInject */
function Endpoint (
  $http, $q, $translate,
  ImmunizationRecordService, SessionHandler, TokenHandler,
  Agent, Disease, Immunization, Lot, Trade,
  DHIR, ICON_API
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

  const getAddress = getWithHeaders((postalQuery) => {
    return `${ICON_API.ADDRESS}?filter[postalCode]=${postalQuery || ''}`;
  })

  const getCity = getWithHeaders((cityQuery) => {
    return `${ICON_API.CITY}?filter[city]=${cityQuery || '*'}`;
  });

  const getDisease = getWithHeaders((diseaseQuery) => {
    return `${ICON_API.DISEASE}?filter[iconDisplay]=${diseaseQuery || ''}`;
  });

  const getSchoolOrDaycare = (schools)=> {
    return getWithHeaders((schoolQuery) => {
      return `${ICON_API.SCHOOL}?filter[name]=${encodeURIComponent(schoolQuery) || '*'}`
    })(schools)
      .then((res) => {
        return res.map((school) => {
          let schoolDisplay = {
            identifier: school.identifier,
            name: school.name,
            city: school.city,
            address: school.address
          };
          schoolDisplay.queryString = `${!!school.name ? school.name + ', ' : ''} ${!!school.address ? school.address + ', ' : ''} ${!!school.city ? school.city : ''}`;
          return schoolDisplay;
        });
    });
  };

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
              (/* Omit query */)
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


/* DHIR PIN Administration APIs ***********************************************/

  const getHeadersWithOiid = (oiid) => {
    return headersWithSession()
      .then((headers) => {
        headers['oiid'] = oiid;
        return headers
      })
  }

  /**
   * Obfuscate PIN before sending it.
   * @param pin
   */
  const obfuscatePin = (pin) => {
    const sha256 = pin => Crypto.SHA256(pin).toString()
    const base64 = pin => Crypto
          .enc.Utf8.parse(pin)
          .toString(Crypto.enc.Base64);

    let obfuscatedPin = base64(JSON.stringify({ pin: sha256(pin) }));
    return obfuscatedPin;
  }

  /* First time PIN set */
  const ClientStatus = (oiid) => {
    return xhr('GET')
              (() => getHeadersWithOiid(oiid))
              ()
              (() => `${ICON_API.PIN_URL}/pin-status`)
              ()
              .catch(response => $q.reject(DHIR.identifyClientStatusError(response)))
  }

  /* Validate HCN */
  const ValidateHCN = (oiid, hcn) => {
    return xhr('POST')
              (headersWithSessionTransactionJson)
              (() => {return {"oiid": oiid, "hcn": hcn}})
              (() => `${ICON_API.PIN_URL}/validate-hcn`)
              ()
              .catch(response => $q.reject(DHIR.identifyValidateHCNError(response)))
  }

  /* Set PIN */
  const SetPIN = (oiid, pin, email, hcn) => {
    let obFuscatedPin = obfuscatePin(pin)

    let setPinInfo = {
      "oiid": oiid,
      "immunizations-context": obFuscatedPin,
      "email": email,
      "hcn": hcn
    }

    return xhr('POST')
              (headersWithSessionTransactionJson)
              (() => setPinInfo)
              (() => `${ICON_API.PIN_URL}/set-pin`)
              ()
              .catch(response => $q.reject(DHIR.identifySetPINError(response)))
  }

  /* Reset Access */
  const ResetAccess = (oiid, email, phuId) => {
    let resetAccessObj = {
      "oiid": oiid,
      "email": email,
      "phuId": phuId,
      "lang": $translate.use().toLowerCase(),
      "callbackUrl": `${ICON_API.BASE_URL}/reset?token=`
    }

    return xhr('POST')
              (headersWithSessionTransactionJson)
              (() => resetAccessObj)
              (() => `${ICON_API.PIN_URL}/reset`)
              ()
              .catch(response => $q.reject(DHIR.identifyResetAccessError(response)))
  }

  /* Validate token for email generation*/
  const ValidateToken = (token) => {
    return xhr('POST')
              (headersWithSessionTransactionJson)
              (() => JSON.stringify({ token: token }))
              (() => `${ICON_API.PIN_URL}/validate-token`)
              ()
              .catch(response => $q.reject(DHIR.identifyValidateTokenError(response)))
  }

  /* Reset PIN */
  const ResetPIN = (token, oiid, role, pin) => {
    let obfuscatedPin = obfuscatePin(pin);

    let resetPinInfo = {
      "oiid": oiid,
      "token": token,
      "immunizations-context": obfuscatedPin,
      "role": role
    };

    return xhr('POST')
              (headersWithSessionTransactionJson)
              (() => resetPinInfo)
              (() => `${ICON_API.PIN_URL}/reset-pin`)
              ()
              .catch(response => $q.reject(DHIR.identifyResetPINError(response)))
  }

/* Interface ******************************************************************/

  return {
    // Old PostgREST lookup APIs
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

    ClientStatus:   ClientStatus,
    ValidateHCN:    ValidateHCN,
    SetPIN:         SetPIN,
    ResetAccess:    ResetAccess,
    ValidateToken:  ValidateToken,
    ResetPIN:       ResetPIN,
  };
}

export default {
  name:   'Endpoint',
  service: Endpoint,
}
