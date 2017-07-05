/**
 * @constructor
 * @param {string} [snomed=''] - SNOMED code for trade
 * @param {string} [manufacturer=''] - manufacturer
 * @param {string} [name=''] - name for this trade
 * @param {string} [shortName=''] - abbreviated name for this trade
 * @param {string} [prevalenceIndex=9] - default prevalence index
 * @returns {Trade}
 */
function Trade (
  snomed,
  manufacturer,
  name,
  shortName,
  prevalenceIndex
) {
  this.snomed = snomed || ''
  this.manufacturer = manufacturer || ''
  this.name = name || ''
  this.shortName = shortName || ''
  this.prevalenceIndex = prevalenceIndex || 9

  /**
   * Creates a deep clone of this object.
   * @memberof Trade
   * @returns {Trade}
   */
  this.clone = function clone () {
    return new Trade(
      this.snomed,
      this.manufacturer,
      this.name,
      this.shortName,
      this.prevalenceIndex
    )
  }
}

export default {
  name: 'Trade',
  model: Trade
}
