/**
 * @param {string} [city=''] - city
 * @param {string} [province=''] - province
 * @param {string} [postalCode=''] - postal code
 * @param {string} [streetNumber=''] - street number
 * @param {string} [streetName=''] - street name
 * @param {string} [streetType=''] - street type
 * @param {string} [streetDirection=''] - street direction
 * @param {string} [unitNumber=''] - unit number
 * @param {string} [line2=''] - line
 * @param {string} [postBox=''] - post office box number
 * @param {string} [retailPostOffice=''] - retail post office (RPO) name
 * @param {string} [station=''] - station identifier
 * @param {string} [ruralRoute=''] - rural route identifier
 * @param {number} [addressType=''] - type of address - street, rural, or POBox
 * @constructor
 * @returns {Address}
 */
function Address (
  city,
  province,
  postalCode,
  streetNumber,
  streetName,
  streetType,
  streetDirection,
  unitNumber,
  line2,
  postBox,
  retailPostOffice,
  station,
  ruralRoute,
  addressType
) {
  this.city = city || ''
  this.province = province || ''
  this.postalCode = postalCode || ''
  this.streetNumber = streetNumber || ''
  this.streetName = streetName || ''
  this.streetType = streetType || ''
  this.streetDirection = streetDirection || ''
  this.unitNumber = unitNumber || ''
  this.line2 = line2 || ''
  this.postBox = postBox || ''
  this.retailPostOffice = retailPostOffice || ''
  this.station = station || ''
  this.ruralRoute = ruralRoute || ''
  this.addressType = addressType || ''

  this.clone = function clone () {
    return new Address(
      this.city,
      this.province,
      this.postalCode,
      this.streetNumber,
      this.streetName,
      this.streetType,
      this.streetDirection,
      this.unitNumber,
      this.line2,
      this.postBox,
      this.retailPostOffice,
      this.station,
      this.ruralRoute,
      this.addressType
    )
  }
}

// TODO: Refactor code using string literals to use this Enum instead.
Address.type = {
  URBAN: 'Street',
  RURAL: 'Rural',
  POBOX: 'POBox'
}

// TODO: Refactor postal code typeahead to use this static function instead of outputting ad-hoc JSON.
Address.prototype.fromJson = (json) => {
  return new Address(
    json.city,
    json.province,
    json.postalCode,
    json.streetNumber,
    json.streetName,
    json.streetType,
    json.streetDirection,
    json.unitNumber,
    json.line2,
    json.postBox,
    json.retailPostOffice,
    json.station,
    json.ruralRoute,
    json.addressType
  )
}

export default {
  name: 'Address',
  model: Address
}
