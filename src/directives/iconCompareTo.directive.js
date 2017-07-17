/**
 * Link function used for comparing email and confirm-email values and watching for changes in initial email input box
 * @memberof iconCompareToDirective
 * @param {object} scope
 * @param {object} element
 * @param {object} attributes
 * @param {object} ctrl
 */
 /* @ngInject */
function linkIsCompareTo (scope, element, attributes, ctrl) {
  ctrl.$validators.compareTo = function (viewValue) {
    switch (viewValue) {
      case scope.validEmail:
        return viewValue === scope.validEmail
      case scope.validPin:
        return viewValue === scope.validPin
      default:
        return false
    }
  }
  scope.$watch('validEmail', function () {
    ctrl.$validate()
  })
  scope.$watch('validPin', function () {
    ctrl.$validate()
  })
}

export default {
  name: 'iconCompareTo',
  directive: function () {
    return {
      require: 'ngModel',
      scope: {
        validEmail: '=?',
        validPin: '=?'
      },
      link: linkIsCompareTo
        // Restrict to be used as element (A)ttribute "icon-hcn-checksum" only
    }
  }
}
