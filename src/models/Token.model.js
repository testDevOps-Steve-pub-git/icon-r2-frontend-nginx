(function () {
'use strict';

  module.exports = function () { return Token; };

  /**
   * @param {String} [encoded=''] - encoded JWT token
   * @param {Object} [decoded={}] - object resulting from decoding JWT token
   * @constructor
   * @returns {Token}
   */
  function Token (
    encoded,
    decoded
  ) {
    this.encoded = encoded || '';
    this.decoded = decoded || {};

    this.clone = clone;

    /**
     * Creates a deep clone of this object.
     * @memberof Token
     * @returns {Token}
     */
    function clone () {
      return new Token(
        this.encoded,
        Object.assign({}, this.decoded)
      );
    }
  }

}());
