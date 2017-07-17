/**
 * This is a directive applying filter to Pin input fields
 * @namespace iconPinFormatDirective
 */
/**
 * @name iconPinFormat
 * @desc Directive for formatting input fields
 * @memberof iconPinFormatDirective
 * @return {object} directive - directive configurations
 */
 /* @ngInject */
function iconPinFormat ($filter) {
  return {
    link: linkParseInput,
    require: 'ngModel',
    restrict: 'A'
  }

    /**
     * @name linkParseInput
     * @desc Link function used for DOM manipulation in parsing input and formatting angular model
     * @memberof iconPinFormatDirective
     * @param {object} scope
     * @param {object} elm
     * @param {object} attrs
     * @param {object} ctrl
     */
  function linkParseInput (scope, elm, attrs, ctrl) {
        // format the view value
    ctrl.$formatters.push(function (a) {
      return $filter('pinFormat')(ctrl.$modelValue)
    })
        // parse user's input
    ctrl.$parsers.push(function (viewValue) {
      var plainNumber = viewValue.replace(/[^0-9]+/ig, '')
      ctrl.$setViewValue($filter('pinFormat')(plainNumber))
      ctrl.$render()
      plainNumber = plainNumber.substring(0, 6)
      return plainNumber
    })
  }
}

export default {
  name: 'iconPinFormat',
  directive: iconPinFormat
}
