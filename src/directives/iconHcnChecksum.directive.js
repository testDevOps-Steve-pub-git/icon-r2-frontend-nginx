/**
 * This is a directive applying hcnfilter to OIID input fields
 * @namespace iconHcnChecksumDirective
 */
(function () {
'use strict';

// Import the shared checksum business logic module.
var hcnChecksum = (function () {
'use strict';

/* Public *********************************************************************/

    /**
     * Validates that an Ontario health card number (HCN) is correctly formatted using a checksum algorithm.
     * @memberof hcnChecksum
     * @param {string} healthCardNumber - representing the health card number to validate
     * @returns {boolean} - true if the number is valid, false otherwise
     */
    function isValidHcn (healthCardNumber) {
        // Only calculate if candidate HCN is correctly formatted to begin with.
        if (HCN_FORMAT_REGEX.test(healthCardNumber)) {
            return check(healthCardNumber);
        }

        return false;
    }

    /** @memberof hcnChecksum */
    var HCN_FORMAT_REGEX = /^\d{4}\s?\-?\d{3}\s?\-?\d{3}$/;


/* Private ********************************************************************/

    /**
     * Strips health card number (HCN) of either formatting characters (spaces or dashes).
     * @param {string} healthCardNumber - text represntation of the HCN
     * @returns {string} - the HCN stripped of formatting
     */
    function stripCharacters (healthCardNumber) {
        var hcNoSpaces = '';
        var hcNoDashes = '';

        var tmpHealthCard = healthCardNumber.split(' ');
        tmpHealthCard.forEach(function (i) { hcNoSpaces += i; });

        tmpHealthCard = hcNoSpaces.split('-');
        tmpHealthCard.forEach(function (i) { hcNoDashes += i; });

        healthCardNumber = hcNoDashes;

        return healthCardNumber;
    }

    /**
     * Calculates the checksum for a health card number (HCN).
     * @param {string} healthCardNumber - text represntation of the HCN
     * @returns {boolean} - true if the checksum matches, false otherwise
     */
    function check (healthCardNumber) {
        healthCardNumber = stripCharacters(healthCardNumber);
        // Keep track of the total numbers added together to check against the check number
        var addedNumbers = 0;

        // Whether the health card is valid or not
        var result = false;

        var healthcardNumArr = healthCardNumber.trim().split('');

        for (var i = 0; i <= 9; i ++) {
            // Because array starts at 0, these would actually be the odd numbers
            if (i % 2 == 0) {
                addedNumbers += checkDoubledNumbers(healthcardNumArr[i]);
            }
            // If even numbers that aren't the last number (Last number is check digit)
            else if (i != 9) {
                addedNumbers += parseInt(healthcardNumArr[i]);
            }
            // If the number is the check digit
            else if (i == 9) {
                result = finalCheck(addedNumbers, healthcardNumArr[i]);
            }
        }

        return result;
    }

    /**
     * Checks a doubled number in a health card number.
     * @param {string|number} splitHealthCardNum - the number to check
     * @returns {number} - the adjusted number
     */
    function checkDoubledNumbers (splitHealthCardNum) {
        var addedNum;
        // Odd Numbers are doubled
        var doubleNum = parseInt(splitHealthCardNum) * 2;

        // If the number is 10 or over the overTen method is called
        if (doubleNum > 9) {
            addedNum = overTen(doubleNum);
        }
        else {
            addedNum = doubleNum;
        }

        return addedNum;
    }

    /**
     * Sums the digits in a number over 10 (example: 14 -> 1 + 4 -> 5).
     * @param {number} numOverTen - a number over 10
     * @returns {number} the sum of the digits
     */
    function overTen (numOverTen) {
        var nArr = numOverTen
                        .toString()
                        .split('');

        var num1 = parseInt(nArr[0]);
        var num2 = parseInt(nArr[1]);

        return (num1 + num2);
    }

    /**
     * Final check for validation of health card number (HCN).
     * @param {number} addedNum - the number
     * @param {number} splitHealthCardNum - the HCN
     * @returns {boolean} - true if the number is valid, false otherwise
     */
    function finalCheck (addedNum, splitHealthCardNum) {
        // All the other numbers are added up. The 2nd number of those  numbers is subtracted by 10.
        // If that number matches the check digit, then it is a valid healthcard format.
        // Ex - All numbers but last (with odd numbers doubled) are 43.
        // The checked digit is 7. The 2nd digit is 3.
        // 10-3 = 7, which = the checked digit of seven. So true is returned.

        var nArray = addedNum
                        .toString()
                        .split('');

        var uPos = parseInt(nArray[1]);

        // MOD 10 because we only want the one digit, otherwise it fails for numbers ending in 0
        var n = (10 - uPos) % 10;

        return (n == splitHealthCardNum);
    }


/* Interface ******************************************************************/
    return {
        isValidHcn: isValidHcn,
        pattern: HCN_FORMAT_REGEX
    };


})();

angular.module('icon.directives')
    .directive('iconHcnChecksum', iconHcnChecksum);

    iconHcnChecksum.$inject = ['$filter'];
    /**
     * @name iconHcnChecksum
     * @desc Directive for formatting input fields
     * @memberof iconHcnChecksumDirective
     * @return {object} directive - directive configurations
     */
    function iconHcnChecksum($filter) {
        return {
            link: linkIsValidHcn,
            require: 'ngModel',
            // Restrict to be used as element (A)ttribute "icon-hcn-checksum" only
            restrict: 'A'
        };

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
                var plainNumber = viewValue.replace(/[^0-9]+/g, '');
                ctrl.$setViewValue($filter('hCNFormat')(plainNumber));
                ctrl.$render();

                plainNumber = plainNumber.substring(0,10);
                return plainNumber;
            });

            ctrl.$validators.iconHcn = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                return hcnChecksum.isValidHcn(viewValue);
            };
        }
    };


})();
