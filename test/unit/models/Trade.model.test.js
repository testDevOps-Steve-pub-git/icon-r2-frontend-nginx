(function () {
'use strict';

  const expect = require('chai').expect;
  const TypeCheck = require('../lib/TypeCheck.js');

  describe('Trade', function () {
      const Trade = require('../../../src/models/Trade.model.js')();

      let dummyData = null;
      let model = null;
      beforeEach(() => {
          model = new Trade();

          dummyData = new Trade(
              '3526007',
              'Company',
              'Rabies',
              'Rab',
              4
          );
      });

      const tradeTextFields = [
        'snomed',
        'manufacturer',
        'name',
        'shortName',
      ];
      const tradeNumberFields = [ 'prevalenceIndex' ];

      describe('new Trade()', () => {
          it(
            'should construct an empty model without undefined values', () => {
              TypeCheck.areAllString(model, tradeTextFields, '');
              TypeCheck.areAllNumber(model, tradeNumberFields);
            });
      });

      describe('.clone()', () => {
        it('should return a cloned object without reference pointers to cloned values', () => {
          let clonedModel = model.clone();

          // Set the cloned values based on dummy data
          tradeTextFields
            .forEach((key) => { clonedModel[key] = dummyData[key] });
          tradeNumberFields
            .forEach((key) => { clonedModel[key] = dummyData[key] });
      });
    });
  });

}());
