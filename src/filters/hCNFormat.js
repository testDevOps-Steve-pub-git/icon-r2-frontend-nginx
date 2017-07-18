/**
 * @desc Health card format filter that will organize into 0000-000-000 format
 * @module icon.hcnFormat
 * @name hcnFormatFilter
 * @namespace hcnFormatFilter
 */
/* @ngInject */
/**
 * @desc Health card formatter
 * @memberof hcnFormatFilter
 * @returns {Function} hcnFilter - filters out data and formats it 0000-000-000
 */
function hcnFormat () {
  function hcnFilter (input, uppercase) {
    input = input || ''
    input = input.replace(/-/g, '')
    input = input.toUpperCase()
    var hcnFormat = ''
    if (input.length <= 4) {
      return input
    }
    var first = input.substring(0, 4)
    var second = input.substring(4, 7)
    var third = input.substring(7, 10)
    if (first) { hcnFormat = first + '-' + second }

    if (third) { hcnFormat += '-' + third }

    return hcnFormat
  };

  return hcnFilter
}

export default {
  name: 'hcnFormat',
  filter: hcnFormat
}
