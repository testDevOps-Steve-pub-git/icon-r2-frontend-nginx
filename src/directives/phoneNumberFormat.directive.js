/**
 * Created on 2016-08-10.
 * Directive for phone number format (123) 123-3333
 */
(function () {
  'use strict';
  angular.module('icon.directives')
      .directive('iconPhonenumberFormat', iconPhonenumberFormat);

  iconPhonenumberFormat.$inject = [];
  function iconPhonenumberFormat() {
    var key;
    var phonenumber;
    return {
      link: linkParseInput,
      require: 'ngModel',
      restrict: 'A'
    };

    /**
     * @desc Link function used for DOM manipulation in parsing input and formatting angular model
     * @memberof iconPhonenumberFormat
     * @param {object} scope
     * @param {object} element
     * @param {object} attrs
     * @param {object} ctrl
     */
    function linkParseInput(scope, element, attrs, ctrl) {
      ctrl.$formatters.push(function(a){
        return ctrl.$modelValue;
      });
      element.bind("keydown keypress", function(event) {
        key = event.which || event.keyCode;
      });
      element.bind('blur', function () {
        phonenumber = formatPhoneNumber(phonenumber);
        ctrl.$setViewValue(phonenumber);
        ctrl.$render();
        return phonenumber;
      });
      ctrl.$parsers.push(function(viewValue){
        var BACK_SPACE_CHAR = 8;
        var DELETE_CHAR = 46;
        phonenumber = viewValue;
        if(key !== BACK_SPACE_CHAR && key !== DELETE_CHAR){
          phonenumber =  formatPhoneNumber(viewValue);
        }
        ctrl.$setViewValue(phonenumber);
        ctrl.$render();
        return phonenumber;
      });
    }

    /**
     * Takes the inputted phone number and returns a formatted one
     * @memberof iconPhonenumberFormat
     * @param phoneNumber
     * @returns {string|*}
     */
    function formatPhoneNumber(phoneNumber) {
      var formattedNumber = '';
      var phoneArr = [];
      var newPhoneNumber = '';
      if (phoneNumber) {
        formattedNumber = phoneNumber.replace(/\D/g, '');
        phoneArr = formattedNumber.split('');
        for (var i = 0; i < 10; i ++) {
          if ( phoneArr[i] === undefined) {
            phoneArr[i] = '';
          }
        }
        newPhoneNumber = '(' + phoneArr[0] + phoneArr[1] + phoneArr[2] + ') '
            + phoneArr[3] + phoneArr[4] + phoneArr[5] + '-'
            + phoneArr[6] + phoneArr[7] + phoneArr[8] + phoneArr[9];
      }
      return newPhoneNumber;
    }
  }
})();
