
/**
 * @desc Health card format filter that will organize into 0000-000-000 format
 * @module icon.hCNFormat
 * @name hCNFormatFilter
 * @namespace hCNFormatFilter
 */
 (function () {
'use strict';
angular.module('icon.filters')
    .filter('hCNFormat', hCNFormat)

    hCNFormat.$inject = [];
    /**
     * @desc Health card formatter
     * @memberof hCNFormatFilter
     * @returns {Function} hCNFilter - filters out data and formats it 0000-000-000
     */
    function hCNFormat() {

      function hCNFilter(input, uppercase) {
        input = input || '';
        input = input.replace(/-/g, '');
        input = input.toUpperCase();
        var hCNFormat = '';
        if (input.length <= 4){
          return input
        }
        var first = input.substring(0, 4);
        var second = input.substring(4, 7);
        var third = input.substring(7, 10);
        if(first)
          hCNFormat = first + "-" + second;

        if(third)
          hCNFormat += "-" + third;

        return hCNFormat;
      };

      return hCNFilter
    };

})();
