(function () {
'use strict';

    var expect = require('chai').expect;
    var TypeCheck = require('../lib/TypeCheck.js');

    describe('Submitter', function () {
        var Submitter = require('../../../src/models/Submitter.model.js')();
        var dummyData = require('../../fixtures/ImmunizationRecordService.SamSmith.data.js');

        var model = null;
        beforeEach(function () { model = new Submitter(); })

        var submitterTextFields = [
            'firstName',
            'lastName',
            'email',
            'emailConfirm',
            'phone1Number',
            'phone1Type',
            'phone1Ext',
            'phone2Number',
            'phone2Type',
            'phone2Ext',
            'relationshipToPatient'
        ];

        describe('new Submitter()', function () {
            it('should construct an empty model without undefined values', function () {
                TypeCheck.areAllString(model, submitterTextFields, '');
            });
        });

        describe('.clone()', function () {
            it('should return a cloned object without reference pointers to cloned values', function () {
                var clonedModel = model.clone();

                // Set the cloned values based on dummy data
                submitterTextFields
                        .forEach(function (key) {
                            clonedModel[key] = dummyData.getSubmitter()[key];
                        });

                // Check that the cloned model is changed, but the original is unaffected
                submitterTextFields
                        .forEach(function (key) {
                            expect(clonedModel[key]).to.equal(dummyData.getSubmitter()[key]);
                            expect(model[key]).to.equal('');
                        });
            });
        });
    });

}());
