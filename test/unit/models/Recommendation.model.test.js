import Disease        from '../../../src/models/Disease.model'
import Recommendation from '../../../src/models/Recommendation.model'

import {expect}   from 'chai'
import TypeCheck  from '../lib/TypeCheck'

describe('Recommendation', function () {

  var dummyData = null
  var dummyDisease = null
  var model = null

  beforeEach(() => {
    model = new Recommendation.model();

    dummyDisease = new Disease.model('Rabies', '123123')
    dummyData = new Recommendation.model(
      '1999-12-31',
      'OVERDUE',
      dummyDisease,
      '456456456'
    );
  });

  var recommendationTextFields = [
    'date',
    'status',
    'vaccineCode'
  ];
  var recommendationObjectFields = [ 'disease' ];

  describe('new Recommendation.model()', function () {
    it('should construct an empty model without undefined values', function () {
      TypeCheck.areAllString(model, recommendationTextFields, '');
    });
  });

  describe('constructed Recommendation()', function () {
    it('should construct a model with correct attribute types', function () {
      TypeCheck.areAllString(dummyData, recommendationTextFields);
      TypeCheck.areAllObject(dummyData, recommendationObjectFields);
    });
  });
});
