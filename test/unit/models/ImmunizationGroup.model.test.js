(function () {
'use strict';

    var expect = require('chai').expect;
    var TypeCheck = require('../lib/TypeCheck.js');

    describe('ImmunizationGroup', function () {
        var ImmunizationGroup = require('../../../src/models/ImmunizationGroup.model.js')();
        var Immunization =      require('../../../src/models/Immunization.model.js')();
        var Agent =             require('../../../src/models/Agent.model.js')();
        var Disease =           require('../../../src/models/Disease.model.js')();

        var dummyData = null;
        var model = null;
        beforeEach(function () {
            model = new ImmunizationGroup();

            dummyData = new ImmunizationGroup(
                'Schedule Immuniztion Title',
                [
                    new Immunization(
                        '2001-01-01',
                        false,
                        new Agent(
                            '3526007',
                            'Rab',
                            'Imovax \/ RabAvert',
                            '3526007',
                            'Rabies (Rab)',
                            [
                                new Disease('Rabies', '')
                            ]
                        ),
                        'Nurse Ratchet',
                        'Vancouver'
                    )
                ]
            );
        });

        var immunizationGroupTextFields = [
            'title'
        ];
        var immunizationGroupArrayFields = [
            'immunizations'
        ];

        describe('new ImmunizationGroup()', function () {
            it('should construct an empty model without undefined values', function () {
                TypeCheck.areAllString(model, immunizationGroupTextFields, '');
                TypeCheck.areAllArray(model, immunizationGroupArrayFields);
            });
        });

        describe('.clone()', function () {
            it('should return a cloned object without reference pointers to cloned values', function () {
                var clonedModel = model.clone();

                // Set the cloned values based on dummy data
                immunizationGroupTextFields
                        .concat(immunizationGroupArrayFields)
                        .forEach(function (key) {
                            clonedModel[key] = dummyData[key];
                        });

                // Check that the cloned model is changed, but the original is unaffected
                clonedModel.immunizations
                        .forEach(function (_, index, immunizations) {
                            expect(immunizations[index].date)
                                    .to.equal(dummyData.immunizations[index].date);
                            expect(immunizations[index].isDateApproximate)
                                    .to.equal(dummyData.immunizations[index].isDateApproximate);
                            expect(immunizations[index].lotNumber)
                                    .to.equal(dummyData.immunizations[index].lotNumber);
                            expect(immunizations[index].provider)
                                    .to.equal(dummyData.immunizations[index].provider);
                        });
            });
        });
    });

}());
