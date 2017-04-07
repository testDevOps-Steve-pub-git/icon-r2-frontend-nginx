(function () {
'use strict';

    var expect = require('chai').expect;
    var TypeCheck = require('../lib/TypeCheck.js');

    describe('Agent', function () {
        var Agent = require('../../../src/models/Agent.model.js')();
        var Disease = require('../../../src/models/Disease.model.js')();

        var dummyData = null;
        var model = null;
        beforeEach(function () {
            model = new Agent();

            dummyData = new Agent(
                '3526007',
                'Rabies',
                'Rab',
                [
                    new Disease('Rabies', '')
                ],
                '90210',
                '1999-12-31',
                4
            );
        });

        var agentTextFields = [
          'snomed',
          'name',
          'shortName',
          'lotNumber',
          'lotExpiration'
        ];
        var agentArrayFields = [ 'diseases' ];
        var agentNumberFields = [ 'prevalenceIndex' ];

        describe('new Agent()', function () {
            it('should construct an empty model without undefined values', function () {
                TypeCheck.areAllString(model, agentTextFields, '');
                TypeCheck.areAllArray(model, agentArrayFields);
                TypeCheck.areAllNumber(model, agentNumberFields);
            });
        });

        describe('.clone()', function () {
            it('should return a cloned object without reference pointers to cloned values', function () {
                var clonedModel = model.clone();

                // Set the cloned values based on dummy data
                agentTextFields
                        .forEach(function (key) {
                            clonedModel[key] = dummyData[key];
                        });
                agentArrayFields
                        .forEach(function (key) {
                            clonedModel[key] = dummyData[key];
                        });
                agentNumberFields
                        .forEach(function (key) {
                            clonedModel[key] = dummyData[key];
                        });

                // Check that the cloned model is changed, but the original is unaffected
                clonedModel.diseases
                        .forEach(function (_, index, diseases) {
                            expect(diseases[index].name)
                                    .to.equal(dummyData.diseases[index].name);
                            expect(diseases[index].referenceCode)
                                    .to.equal(dummyData.diseases[index].referenceCode);
                        });

                expect(model.diseases.length).to.equal(0);
            });
        });
    });

}());
