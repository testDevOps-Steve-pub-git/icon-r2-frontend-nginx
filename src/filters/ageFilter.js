/**
 * @desc Date filter that will calculate age based on input dates
 * @module icon.ageFilter
 * @name ageFilter
 * @namespace ageFilter
 */
/* @ngInject */
/**
 * @desc calculates age
 * @memberof ageFilter
 * @returns {Function} ageFilter - filters out data and formats it 0000-000-000
 */
function ageFilter($filter, moment) {

  return ageFilter;

  function ageFilter(startDate, endDate) {
    startDate = new moment(startDate) || new moment();
    endDate = new moment(endDate) || new moment();

    var diffDuration = moment.duration(endDate.diff(startDate));
    var years = diffDuration.years();
    var months = diffDuration.months();

    var out = years + " Year(s) " + months + " Month(s)";
    return out;
  }
}

export default {
  name: 'ageFilter',
  filter: ageFilter
}
