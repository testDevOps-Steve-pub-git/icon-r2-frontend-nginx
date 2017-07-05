import Token from './Token.model'

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
  this.sessionToken = sessionToken || new Token.model()
  this.transactionToken = transactionToken || new Token.model()
  this.gatingCode = gatingCode || ''

  /**
   * Creates a deep clone of this object.
   * @memberof SessionData
   * @returns {SessionData}
   */
  this.clone = function clone () {
    return new SessionData(
      this.sessionToken.clone(),
      this.transactionToken.clone(),
      this.gatingCode
    )
  }
}

export default {
  name: 'SessionData',
  model: SessionData
}
