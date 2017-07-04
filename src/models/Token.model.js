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
  this.encoded = encoded || ''
  this.decoded = decoded || {}

  /**
   * Creates a deep clone of this object.
   * @memberof Token
   * @returns {Token}
   */
  this.clone = function clone () {
    return new Token(
      this.encoded,
      Object.assign({}, this.decoded)
    )
  }
}

export default {
  name: 'Token',
  model: Token
}
