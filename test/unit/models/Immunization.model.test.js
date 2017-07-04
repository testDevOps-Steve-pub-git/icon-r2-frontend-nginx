import Agent        from '../../../src/models/Agent.model'
import Disease      from '../../../src/models/Disease.model'
import Immunization from '../../../src/models/Immunization.model'
import Lot          from '../../../src/models/Lot.model'
import Trade        from '../../../src/models/Trade.model'

import {expect}     from 'chai'
import TypeCheck    from '../lib/TypeCheck'

(function () {
'use strict';


  describe('Immunization', function () {

    var model = null;
    var dummyData = null;
    beforeEach(function () {
      model = new Immunization.model();
      dummyData = new Immunization.model(
        '2001-01-01',
        false,
        new Agent.model(
          '3526007',
          'Rab',
          'Imovax \/ RabAvert',
          '3526007',
          'Rabies (Rab)',
          [
            new Disease.model('Rabies', '123123')
          ],
          'LOT-NUM-ABC-123-45',
          '2001-12-12'
        ),
        new Trade.model(),
        'Dr. Who',
        'In a Tardis',
        new Lot.model()
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

    describe('new Immunization.model()', function () {
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
