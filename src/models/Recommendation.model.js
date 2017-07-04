import Disease from './Disease.model'

/**
 * @param {String} [date=''] - encoded JWT token
 * @param {String} [status=''] - object resulting from decoding JWT token
 * @param {Disease} [disease=''] - object resulting from decoding JWT token
 * @param {String} [vaccineCode=''] - object resulting from decoding JWT token
 * @constructor
 * @returns {Recommendation}
 */
function Recommendation (
  date,
  status,
  disease,
  vaccineCode
) {
  this.date = date || ''
  this.status = status || ''
  this.disease = disease || new Disease.model()
  this.vaccineCode = vaccineCode || ''

  /**
   * Creates a deep clone of this object.
   * @memberof Recommendation
   * @returns {Recommendation}
   */
  this.clone = function clone () {
    return new Recommendation(
      this.date,
      this.status,
      this.disease.clone(),
      this.vaccineCode
    )
  }
}

export default {
  name: 'Recommendation',
  model: Recommendation
}
