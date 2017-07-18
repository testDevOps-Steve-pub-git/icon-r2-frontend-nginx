 import hcnChecksum from './hcnChecksum.helper.js'

/**
 * @name iconHcnChecksum
 * @desc Directive for formatting input fields
 * @memberof iconHcnChecksumDirective
 * @return {object} directive - directive configurations
 */
/* @ngInject */
function iconHcnChecksum ($filter) {
  return {
   link: linkIsValidHcn,
   require: 'ngModel',
      // Restrict to be used as element (A)ttribute "icon-hcn-checksum" only
   restrict: 'A'
  }

  /**
   * @name linkIsValidHcn
   * @desc Link function used for DOM manipulation in parsing input and formatting angular model
   * @memberof iconHcnChecksumDirective
   * @param {object} scope
   * @param {object} elm
   * @param {object} attrs
   * @param {object} ctrl
   */

  function linkIsValidHcn (scope, elm, attrs, ctrl) {
    //parse user's input
    ctrl.$parsers.push(function (viewValue) {
      var plainNumber = viewValue.replace(/[^0-9]+/g, '')
      ctrl.$setViewValue($filter('hcnFormat')(plainNumber))
      ctrl.$render()

      plainNumber = plainNumber.substring(0, 10)
        return plainNumber
    })

    ctrl.$validators.iconHcn = function (modelValue, viewValue) {
      if (ctrl.$isEmpty(modelValue)) {
        return true
      }
      return hcnChecksum().isValidHcn(viewValue)
    }
  }
}

export default {
 name: 'iconHcnChecksum',
 directive: iconHcnChecksum
}
