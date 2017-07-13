/**
 * @param {string} [firstName=''] - given name
 * @param {string} [middleName=''] - middle name
 * @param {string} [lastName=''] - family name
 * @param {string} [dateOfBirth=''] - date of birth (date string, example: 1999-12-31)
 * @param {string} [schoolOrDayCare=''] - school / daycare name
 * @param {string} [schoolOrDayCareIdentifier=''] - school / daycare identifier
 * @param {string} [healthCardNumber=''] - health card number
 * @param {string} [oiid=''] - Ontario immunization identification (OIID) number
 * @param {string} [gender=''] - gender code
 * @constructor
 * @returns {Patient}
 */
function Patient (
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  schoolOrDayCare,
  schoolOrDayCareIdentifier,
  healthCardNumber,
  oiid,
  gender
) {
  this.firstName = firstName || ''
  this.middleName = middleName || ''
  this.lastName = lastName || ''
  this.dateOfBirth = dateOfBirth || ''
  this.schoolOrDayCare = schoolOrDayCare || ''
  this.schoolOrDayCareIdentifier = schoolOrDayCareIdentifier || ''
  this.healthCardNumber = healthCardNumber || ''
  this.oiid = oiid || ''
  this.gender = gender || ''

  /**
   * Creates a deep clone of this object.
   * @memberof Patient
   * @returns {Patient}
   */
  this.clone = function clone () {
    return new Patient(
      this.firstName,
      this.middleName,
      this.lastName,
      this.dateOfBirth,
      this.schoolOrDayCare,
      this.schoolOrDayCareIdentifier,
      this.healthCardNumber,
      this.oiid,
      this.gender
    )
  }
}

/* NOTE: These values match FHIR spec for submssions to DHIR. */
Patient.genders = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
}

export default {
  name: 'Patient',
  model: Patient
}
