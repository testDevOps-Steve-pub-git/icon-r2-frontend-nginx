(function () {
'use strict';

    var expect = require('chai').expect;
    var TypeCheck = require('../lib/TypeCheck.js');

    describe('Patient', function () {
        var Patient = require('../../../src/models/Patient.model.js')();
        var dummyData = require('../../fixtures/ImmunizationRecordService.SamSmith.data.js');

        var model = null;
        beforeEach(function () { model = new Patient(); })

        var clientTextFields = [
            'firstName',
            'middleName',
            'lastName',
            'dateOfBirth',
            'schoolOrDayCare',
            'schoolOrDayCareIdentifier',
            'healthCardNumber',
            'oiid',
            'gender'
        ];

        describe('new Patient()', function () {
            it('should construct an empty model without undefined values', function () {
                TypeCheck.areAllString(model, clientTextFields, '');
            });
        });

        describe('.clone()', function () {
            it('should return a cloned object without reference pointers to cloned values', function () {
                var clonedModel = model.clone();

                // Set the cloned values based on dummy data
                clientTextFields
                        .forEach(function (key) {
                            clonedModel[key] = dummyData.getPatient()[key];
                        });

                // Check that the cloned model is changed, but the original is unaffected
                clientTextFields
                        .forEach(function (key) {
                            expect(clonedModel[key]).to.equal(dummyData.getPatient()[key]);
                            expect(model[key]).to.equal('');
                        });
            });
        });
    });

}());
