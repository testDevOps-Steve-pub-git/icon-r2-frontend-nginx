(function () {
'use strict';
  module.exports = TokenHandler;

  function TokenHandler ($http, $q, $interval, jwtHelper, Token, ICON_API, ICON_TOKEN, ICON_EVENT) {
/* Private ********************************************************************/

    let sessionToken = null;
    let transactionToken = null;

    let sessionExpiration = -1;
    let transactionExpiration = -1;

    function checkSessionExpiration () {
      getSessionToken()
        .then((token) => {

          let currentTimeInSeconds = Math.round(Date.now() / 1000);
          let tokenExpiryThreshold = (token.decoded.exp
                                      - ICON_TOKEN.SESSION_EXPIRY_PROMPT_TIME
                                      - ICON_TOKEN.LATENCY_TIME);
          let sessionExpiryEvent = new CustomEvent(
                                          ICON_EVENT.TOKEN_SESSION_EXPIRY,
                                          {
                                            bubbles:    true,
                                            cancelable: true,
                                            detail: {
                                              expiry: tokenExpiryThreshold
                                            }
                                          }
                                        );

          let sessionKillEvent = new CustomEvent(
                                          ICON_EVENT.TOKEN_SESSION_KILL,
                                          {
                                            bubbles:    true,
                                            cancelable: true,
                                            detail: {
                                              remainingTime: 0
                                            }
                                          }
                                        );

          if (currentTimeInSeconds >= token.decoded.exp) {
            window.document.dispatchEvent(sessionKillEvent);
          }
          else if (currentTimeInSeconds >= tokenExpiryThreshold) {
            window.document.dispatchEvent(sessionExpiryEvent);
          }

          // console.log(`CURRENT TIME:  ${currentTimeInSeconds}`);
          // console.log(`SESSION EXP:   ${tokenExpiryThreshold}`);
          // console.log(`SESSION ${(currentTimeInSeconds < tokenExpiryThreshold) ? 'IS' : 'IS NOT'} VALID!`);
        });
    }

    function checkTransactionExpiration () {
      getTransactionToken()
        .then((token) => {
          let currentTimeInSeconds = Math.round(Date.now() / 1000);
          let tokenExpiryThreshold = (token.decoded.exp
                                      - ICON_TOKEN.TRANSACTION_EXPIRY_PROMPT_TIME
                                      - ICON_TOKEN.LATENCY_TIME);
          let transactionExpiryEvent = new CustomEvent(
                                          ICON_EVENT.TOKEN_TRANSACTION_EXPIRY,
                                          {
                                            bubbles:    true,
                                            cancelable: true,
                                            detail: {
                                              expiry: tokenExpiryThreshold
                                            }
                                          }
                                        );


          let sessionKillEvent = new CustomEvent(
                                      ICON_EVENT.TOKEN_SESSION_KILL,
                                      {
                                        bubbles:    true,
                                        cancelable: true,
                                        detail: {
                                          remainingTime: 0
                                        }
                                      }
                                    );

          if (currentTimeInSeconds >= token.decoded.exp) {
            window.document.dispatchEvent(sessionKillEvent);
          }
          else if (currentTimeInSeconds >= tokenExpiryThreshold) {
            window.document.dispatchEvent(transactionExpiryEvent);
          }
          // console.log(`CURRENT TIME:    ${currentTimeInSeconds}`);
          // console.log(`TRANSACTION EXP: ${tokenExpiryThreshold}`);
          // console.log(`TRANSACTION ${(currentTimeInSeconds < tokenExpiryThreshold) ? 'IS' : 'IS NOT'} VALID!`);
        });
    }

    $interval(checkSessionExpiration, ICON_TOKEN.SESSION_EXPIRY_CHECK_INTERVAL);
    $interval(checkTransactionExpiration, ICON_TOKEN.TRANSACTION_EXPIRY_CHECK_INTERVAL);

    /** Sets the session token resulting from an AJAX response.
     * @param {Promise} response - the AJAX response
     * @returns {Promise => Token} - the session token
     */
    function setSessionToken (response) {
      let encoded = response.data.token;
      sessionToken = new Token(encoded, jwtHelper.decodeToken(encoded));
      return $q.when(sessionToken);
    }

    /** Sets the transaction token resulting from an AJAX response.
     * @param {Promise} response - the AJAX response
     * @returns {Promise => Token} - the transaction token
     */
    function setTransactionToken (response) {
      let encoded = response.data.token;
      transactionToken = new Token(encoded, jwtHelper.decodeToken(encoded));
      return $q.when(transactionToken);
    }

    function emitSessionRefresh () {
      console.log('SESSION TIMED OUT!');
    }

    function emitTransactionRefresh () {
      console.log('TRANSACTION TIMED OUT!');
    }


/* Public *********************************************************************/

    /** Gets the session token resulting from an AJAX response.
     * @returns {Promise => Token} - the session token
     */
    function getSessionToken () {
       // If we already have a transaction token, return it.
      if (sessionToken !== null) return $q.when(sessionToken);

      // Otherwise get a session token.
      return $http.get(ICON_API.GET_SESSION_TOKEN)
                  .then(setSessionToken);
    }

    /** Refreshes the session token using the existing token.
     * @returns {Promise => Token} - the session token
     */
    function refreshSessionToken () {
      if (sessionToken === null) return getSessionToken();
      return getSessionToken()
            .then((token) => {
               let headers = { 'session-token': token.encoded };
               return $http.get(
                              ICON_API.REFRESH_SESSION_TOKEN,
                              { headers: headers }
                            );
             })
            .then(setSessionToken);
    }

    /** Gets the transaction token resulting from an AJAX response.
     * @returns {Promise => Token} - the transaction token
     */
    function getTransactionToken () {
      // If we already have a transaction token, return it.
      if (transactionToken !== null) return $q.when(transactionToken);

      // If we already have a session token, use it to get a transaction token.
      if (sessionToken !== null) {
        let headers = { 'session-token': sessionToken.encoded };
        return $http.get(ICON_API.GET_TRANSACTION_TOKEN, { headers: headers })
                    .then(setTransactionToken);
      }

      // Otherwise get a session token, then use it to get a transaction token.
      return getSessionToken()
                .then(setSessionToken)
                .then(() => getTransactionToken(sessionToken.encoded))
                .then(setTransactionToken);
    }

    /** Refreshes the session token using the existing token.
     * @returns {Promise => Token} - the session token
     */
    function refreshTransactionToken () {
      if (transactionToken === null) return getTransactionToken();

      let headers = {};
      return getSessionToken()
             .then((token) => {
               headers['session-token'] = token.encoded;
               return token;
             })
             .then(getTransactionToken)
             .then((token) => {
               headers['submission-token'] = token.encoded;
               return token;
             })
             .then(() => {
               return $http.get(ICON_API.REFRESH_TRANSACTION_TOKEN, { headers: headers });
             })
             .then(setTransactionToken);
    }

    /** Clears the transaction token (use after transaction is complete). */
    function clearTransactionToken () { transactionToken = null; }


/* Interface ******************************************************************/

    return {
      getSessionToken:          getSessionToken,
      refreshSessionToken:      refreshSessionToken,

      getTransactionToken:      getTransactionToken,
      refreshTransactionToken:  refreshTransactionToken,
      clearTransactionToken:    clearTransactionToken,
    };
  }

}());
