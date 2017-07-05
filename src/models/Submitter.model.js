/**
 * @param {string} [firstName=''] - given name
 * @param {string} [lastName=''] - family name
 * @param {string} [email=''] - email address
 * @param {string} [emailConfirm=''] - confirmation of email address
 * @param {string} [phone1Number=''] - primary phone number (including area code)
 * @param {string} [phone1Type=''] - primary phone type
 * @param {string} [phone1Ext=''] - primary phone extension
 * @param {string} [phone2Number=''] - secondary phone number (including area code)
 * @param {string} [phone2Type=''] - secondary phone type
 * @param {string} [phone2Ext=''] - secondary phone extension
 * @param {string} [relationshipToPatient=''] - submitter's relationship to the client (patient)
 * @constructor
 * @returns {Submitter}
 */
function Submitter (
    firstName,
    lastName,
    email,
    emailConfirm,
    phone1Type,
    phone1Number,
    phone1Ext,
    phone2Type,
    phone2Number,
    phone2Ext,
    relationshipToPatient
) {
  this.firstName = firstName || ''
  this.lastName = lastName || ''
  this.email = email || ''
  this.emailConfirm = emailConfirm || ''
  this.phone1Number = phone1Number || ''
  this.phone1Type = phone1Type || ''
  this.phone1Ext = phone1Ext || ''
  this.phone2Number = phone2Number || ''
  this.phone2Type = phone2Type || ''
  this.phone2Ext = phone2Ext || ''
  this.relationshipToPatient = relationshipToPatient || ''

  /**
   * Creates a deep clone of this object.
   * @memberof Submitter
   * @returns {Submitter}
   */
  this.clone = function clone () {
    return new Submitter(
      this.firstName,
      this.lastName,
      this.email,
      this.emailConfirm,
      this.phone1Type,
      this.phone1Number,
      this.phone1Ext,
      this.phone2Type,
      this.phone2Number,
      this.phone2Ext,
      this.relationshipToPatient
    )
  }
}

Submitter.relationships = {
  GUARD: 'GUARD',
  ONESELF: 'ONESELF'
}

export default {
  name: 'Submitter',
  model: Submitter
}
