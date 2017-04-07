/**
 * This is a directive applying hcnfilter to OIID input fields
 * @namespace iconOiidFormatDirective
 */
(function () {
'use strict';

angular.module('icon.directives')
    .directive('iconOiidFormat', iconOiidFormat);

    iconOiidFormat.$inject = ['$filter'];
    /**
     * @name iconOiidFormat
     * @desc Directive for formatting input fields
     * @memberof iconOiidFormatDirective
     * @return {object} directive - directive configurations
     */
    function iconOiidFormat($filter) {
        return {
            link: linkParseInput,
            require: 'ngModel',
            restrict: 'A'
        };

        /**
         * @name linkParseInput
         * @desc Link function used for DOM manipulation in parsing input and formatting angular model
         * @memberof iconOiidFormatDirective
         * @param {object} scope
         * @param {object} elm
         * @param {object} attrs
         * @param {object} ctrl
         */
        function linkParseInput (scope, elm, attrs, ctrl) {

            //format the view value
            ctrl.$formatters.push(function (a) {
                return $filter('hCNFormat')(ctrl.$modelValue)
            });
            //parse user's input
            ctrl.$parsers.push(function (viewValue) {
                var plainNumber = viewValue.replace(/[^2-9b-df-hj-np-tv-xz]+/ig, '');
                ctrl.$setViewValue($filter('hCNFormat')(plainNumber));
                ctrl.$render();

                plainNumber = plainNumber.substring(0,10);
                return plainNumber;
            });
        }
    };


})();
