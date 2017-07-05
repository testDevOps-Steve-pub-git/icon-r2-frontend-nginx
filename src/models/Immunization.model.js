import Agent from './Agent.model'
import Trade from './Trade.model'
import Lot from './Lot.model'

const IMMUNIZATION_TYPE = {
  GENERIC: `Agent`, // Generic vaccine: has agent, trade data not populated
  BRANDED: `Trade` // Branded vaccine: has agent and trade data
}

/**
 * @param {string} [date=''] - date immunization was administered
 * @param {boolean} [isDateApproximate=false] - flag for approximate date
 * @param {Agent} [agent=Agent] - agent in immunization administered
 * @param {string} [provider=''] - health-care provider (doctor, nurese, PHU etc.)
 * @param {string} [location=''] - geographic location where immunization occured
 * @param {Lot} [lot=Lot] - agent / trade lot number & expiry
 * @param {String} [vaccineCode=''] - snomed value used to convert from FHIR message (NOTE: optional in newly constructed Immunization objects)
 * @constructor
 * @returns {Immunization}
 */
function Immunization (
  date,
  isDateApproximate,
  agent,
  trade,
  provider,
  location,
  lot,
  vaccineCode
) {
  this.date = date || ''
  this.isDateApproximate = isDateApproximate || false
  this.agent = agent || new Agent.model()
  this.trade = trade || new Trade.model()
  this.provider = provider || ''
  this.location = location || ''
  this.lot = lot || new Lot.model()
  this.vaccineCode = vaccineCode || ''

  this.IMMUNIZATION_TYPE = IMMUNIZATION_TYPE

  this.getType = () => {
    return (this.trade.snomed)
              ? IMMUNIZATION_TYPE.BRANDED
              : IMMUNIZATION_TYPE.GENERIC
  }

  this.getPrevalence = () => {
    return (this.trade.snomed)
              ? this.trade.prevalenceIndex
              : this.agent.prevalenceIndex
  }

  /**
   * Creates a deep clone of this object.
   * @memberof Immunization
   * @returns {Immunization}
   */
  this.clone = function clone () {
    return new Immunization(
      this.date,
      this.isDateApproximate,
      this.agent.clone(),
      this.trade.clone(),
      this.provider,
      this.location,
      this.lot.clone(),
      this.vaccineCode
    )
  }
}

Immunization.type = IMMUNIZATION_TYPE

export default {
  name: 'Immunization',
  model: Immunization
}
