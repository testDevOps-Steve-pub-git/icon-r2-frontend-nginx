/**
 * @param {String} [number=''] - encoded JWT token
 * @param {Object} [expiry=''] - object resulting from decoding JWT token
 * @constructor
 * @returns {Token}
 */
function Lot (
  number,
  expiry,
  lotDisplayNumber
) {
  this.number = number || ''
  this.expiry = expiry || ''
  this.lotDisplayNumber = lotDisplayNumber || ''

  /**
   * Creates a deep clone of this object.
   * @memberof Lot
   * @returns {Lot}
   */
  this.clone = function clone () {
    return new Lot(
      this.number,
      this.expiry,
      this.lotDisplayNumber
    )
  }
}

export default {
  name: 'Lot',
  model: Lot
}
