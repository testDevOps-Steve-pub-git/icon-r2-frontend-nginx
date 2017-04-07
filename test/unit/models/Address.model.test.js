(function () {
'use strict';

    var expect = require('chai').expect;
    var TypeCheck = require('../lib/TypeCheck.js');

    describe('Address', function () {
        var Address = require('../../../src/models/Address.model.js')();
        var dummyData = require('../../fixtures/ImmunizationRecordService.SamSmith.data.js');

        var model = null;
        beforeEach(function () { model = new Address(); })

        var addressTextFields = [
            'city',
            'province',
            'postalCode',
            'streetNumber',
            'streetName',
            'streetType',
            'streetDirection',
            'unitNumber',
            'line2',
            'postBox',
            'retailPostOffice',
            'station',
            'ruralRoute',
            'addressType'
        ];

        describe('new Address()', function () {
            it('should construct an empty model without undefined values', function () {
                TypeCheck.areAllString(model, addressTextFields, '');
            });
        });

        describe('.clone()', function () {
            it('should return a cloned object without reference pointers to cloned values', function () {
                var clonedModel = model.clone();

                // Set the cloned values based on dummy data
                addressTextFields
                        .forEach(function (key) {
                            clonedModel[key] = dummyData.getAddress()[key];
                        });

                // Check that the cloned model is changed, but the original is unaffected
                addressTextFields
                        .forEach(function (key) {
                            expect(clonedModel[key]).to.equal(dummyData.getAddress()[key]);
                            expect(model[key]).to.equal('');
                        });
            });
        });
    });

}());
