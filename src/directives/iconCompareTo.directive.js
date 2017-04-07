/**
 * Validation directive used to compare equality of the calling element and it's target element.
 */
(function () {
    'use strict';
    angular.module('icon.directives')
        /**
         * Directive for checking email and confirm-email input boxes
         * @memberof iconCompareToDirective
         * @return {object} directive - directive configurations
         */
        .directive('iconCompareTo',function() {
        return {
            require: 'ngModel',
            scope: {
                validEmail: '='
            },
            link: linkIsCompareTo
            // Restrict to be used as element (A)ttribute "icon-hcn-checksum" only
        };
    });

    linkIsCompareTo.$inject = ['scope', 'element', 'attributes', 'ctrl'];
    /**
     * Link function used for comparing email and confirm-email values and watching for changes in initial email input box
     * @memberof iconCompareToDirective
     * @param {object} scope
     * @param {object} element
     * @param {object} attributes
     * @param {object} ctrl
     */
        function linkIsCompareTo(scope, element, attributes, ctrl) {
            ctrl.$validators.compareTo = function (viewValue)
            {
                return viewValue === scope.validEmail;
            };
            scope.$watch("validEmail",function(){
                ctrl.$validate();
            });
        }
})();
