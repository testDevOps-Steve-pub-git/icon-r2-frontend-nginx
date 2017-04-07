(function () {
'use strict';

  module.exports = function () { return Lot; };

  /**
   * @param {String} [number=''] - encoded JWT token
   * @param {Object} [expiry=''] - object resulting from decoding JWT token
   * @constructor
   * @returns {Token}
   */
  function Lot (
    number,
    expiry
  ) {
    this.number = number || '';
    this.expiry = expiry || '';

    this.clone = clone;

    /**
     * Creates a deep clone of this object.
     * @memberof Lot
     * @returns {Lot}
     */
    function clone () {
      return new Lot(
        this.number,
        this.expiry
      );
    }
  }

}());
