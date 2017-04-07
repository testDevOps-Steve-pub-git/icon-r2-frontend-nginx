(function () {
'use strict';

  var Token = require('./Token.model.js')();

  module.exports = function () { return SessionData; };

  /**
   * @param {Token} [sessionToken=''] - token for the entire user session
   * @param {Token} [transactionToken=''] - token for current transaction in the user session
   * @constructor
   * @returns {SessionData}
   */
  function SessionData (
    sessionToken,
    transactionToken,
    gatingCode
  ) {
    this.sessionToken = sessionToken || new Token();
    this.transactionToken = transactionToken || new Token();
    this.gatingCode = gatingCode || '';

    this.clone = clone;

    /**
     * Creates a deep clone of this object.
     * @memberof SessionData
     * @returns {SessionData}
     */
    function clone () {
      return new SessionData(
        this.sessionToken.clone(),
        this.transactionToken.clone(),
        this.gatingCode
      );
    }
  }

}());
