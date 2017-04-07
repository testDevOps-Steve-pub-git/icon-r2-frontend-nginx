/**
 * Slice Pipe for displaying chunks of a string
 * @name slice
 * @module widget.slice
 * @namespace slice
 */
(function () {
    'use strict';
    angular.module('icon.filters')
        .filter('slice', slice);

        slice.$inject = [];
        function slice () {
            return function (arr, start, end) {
                if (!arr) {
                    return;
                }
                return arr.slice(start, end);
            };
        }
})();
