(function () {
'use strict';

  var expect    = require('chai').expect;
  var TypeCheck = require('../lib/TypeCheck.js');

  describe('Immunization', function () {
    var Agent         = require('../../../src/models/Agent.model.js')();
    var Disease       = require('../../../src/models/Disease.model.js')();
    var Immunization  = require('../../../src/models/Immunization.model.js')();
    var Lot           = require('../../../src/models/Lot.model.js')();
    var Trade         = require('../../../src/models/Trade.model.js')();

    var model = null;
    var dummyData = null;
    beforeEach(function () {
      model = new Immunization();
      dummyData = new Immunization(
        '2001-01-01',
        false,
        new Agent(
          '3526007',
          'Rab',
          'Imovax \/ RabAvert',
          '3526007',
          'Rabies (Rab)',
          [
            new Disease('Rabies', '123123')
          ],
          'LOT-NUM-ABC-123-45',
          '2001-12-12'
        ),
        new Trade(),
        'Dr. Who',
        'In a Tardis',
        new Lot()
      );
    });

    var immunizationTextFields = [
      'date',
      'provider',
      'location',
    ];
    var immunizationBooleanFields = [ 'isDateApproximate' ];
    var immunizationObjectFields = [
      'agent',
      'trade',
      'lot',
    ];

    describe('new Immunization()', function () {
      it('should construct an empty model without undefined values', function () {
        TypeCheck.areAllString(model, immunizationTextFields, '');
        TypeCheck.areAllBoolean(model, immunizationBooleanFields);
        TypeCheck.areAllObject(model, immunizationObjectFields);
      });
    });

    describe('.clone()', function () {
      it('should return a cloned object without reference pointers to cloned values', function () {
        var clonedModel = model.clone();

        // Set the cloned values based on dummy data
        immunizationTextFields
            .concat(immunizationBooleanFields)
            .concat(immunizationObjectFields)
            .forEach(function (key) {
                clonedModel[key] = dummyData[key];
            });

        // Check that the cloned model is changed, but the original is unaffected
        expect(clonedModel.date)
                .to.equal(dummyData.date);
        expect(clonedModel.isDateApproximate)
                .to.equal(dummyData.isDateApproximate);
        expect(clonedModel.agent)
                .to.deep.equal(dummyData.agent);
        expect(clonedModel.provider)
                .to.equal(dummyData.provider);
        expect(clonedModel.location)
                .to.equal(dummyData.location);
      });
    });
  });

}());
