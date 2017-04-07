
/**
 * @desc Pin format filter that will limit to 6 character format
 * @module icon.pinFormat
 * @name pinFormatFilter
 * @namespace pinFormatFilter
 */
 (function () {
'use strict';
angular.module('icon.filters')
    .filter('pinFormat', pinFormat)

    pinFormat.$inject = [];
    /**
     * @desc Pin input formatter
     * @memberof pinFormatFilter
     * @returns {Function} pinFilter - limits input to 6 characters
     */
    function pinFormat() {

      function pinFilter(input, uppercase) {
        input = input || '';

        var pinFormat = '';
        if (input.length <= 4){
          return input
        }
        pinFormat = input.substring(0, 6);
        return pinFormat;
      };

      return pinFilter
    };

})();
