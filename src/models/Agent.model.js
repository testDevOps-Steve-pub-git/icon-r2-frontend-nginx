/**
 * @constructor
 * @param {string} [snomed=''] - SNOMED code for agent
 * @param {string} [name=''] - normal display name
 * @param {string} [shortName=''] - abbreviated display name
 * @param {Array<Disease>} [diseases=Array] - array of diseases
 * @param {string} [lotNumber=''] - lot number
 * @param {string} [lotExpiration=''] - expiration date (YYYY-MM-DD)
 * @param {number} [prevalenceIndex=9] - prevalence index for sorting and conditional display
 * @param {string} [orderedDiseases=''] - For displaying diseases associated with agent in order determined by MOH
 * @returns {Agent}
 */
function Agent (
  snomed,
  name,
  shortName,
  diseases,
  lotNumber,
  lotExpiration,
  prevalenceIndex,
  orderedDiseases
) {
  this.snomed = snomed || ''
  this.name = name || ''
  this.shortName = shortName || ''
  this.diseases = diseases || []
  this.lotNumber = lotNumber || ''
  this.lotExpiration = lotExpiration || ''
  this.prevalenceIndex = prevalenceIndex || 9
  this.orderedDiseases = orderedDiseases || ''

  this.clone = clone

  /**
   * Creates a deep clone of this object.
   * @memberof Agent
   * @returns {Agent}
   */
  function clone () {
    return new Agent(
      this.snomed,
      this.name,
      this.shortName,
      this.diseases.map(disease => disease.clone()),
      this.lotNumber,
      this.lotExpiration,
      this.prevalenceIndex,
      this.orderedDiseases
    )
  }
}

export default {
  name: 'Agent',
  model: Agent
}
