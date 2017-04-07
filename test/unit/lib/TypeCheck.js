(function () {
'use strict';
    var expect = require('chai').expect;

    module.exports = TypeCheck();

    function TypeCheck () {
        /**
         * Higher order function that creates type checkers
         * @param {string} type - lower case string of type name (example: 'string')
         * @returns {function (obj, keyNames)} - function with type partially applied, expecting and object and collection of key names
         */
        function expectAllTypesMatcher (type) {
            if (type === undefined || typeof type !== 'string')
                throw new Error('Was expecting a string type, instead found:\n' + JSON.stringify(type));

            return function (obj, keyNames, value) {
                if (obj === undefined)
                    throw new Error('Was expecting an object, instead found:\n' + JSON.stringify(obj));

                if (keyNames === undefined || !(keyNames instanceof Array))
                    throw new Error('Was expecting an array, instead found:\n' + JSON.stringify(keyNames));

                keyNames.forEach(function (key) {
                    expect(obj[key]).not.to.be.undefined;
                    expect(obj[key]).to.be.a(type);
                    if (value !== undefined) expect(obj[key]).to.equal(value);
                });
            };
        }

        return {
            expectAllTypesMatcher:  expectAllTypesMatcher,
            areAllString:           expectAllTypesMatcher('string'),
            areAllArray:            expectAllTypesMatcher('array'),
            areAllNumber:           expectAllTypesMatcher('number'),
            areAllBoolean:          expectAllTypesMatcher('boolean'),
            areAllUndefined:        expectAllTypesMatcher('undefined'),
            areAllObject:           expectAllTypesMatcher('object'),
        };
    }

}());
