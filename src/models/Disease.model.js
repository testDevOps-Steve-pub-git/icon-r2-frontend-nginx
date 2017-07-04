/**
 * @param {string} [name=''] - disease name
 * @param {string} [snomed=''] - disease snomed code
 * @constructor
 * @returns {Disease}
 */
function Disease (
  name,
  snomed
) {
  this.name = name || ''
  this.snomed = snomed || ''

  /**
   * Creates a deep clone of this object.
   * @memberof Disease
   * @returns {Disease}
   */
  this.clone = function clone () {
    return new Disease(
      this.name,
      this.snomed
    )
  }
}

export default {
  name: 'Disease',
  model: Disease
}
