(function () {
'use strict';

  var expect = require('chai').expect;
  var TypeCheck = require('../lib/TypeCheck.js');

  describe('Recommendation', function () {
    var Recommendation  = require('../../../src/models/Recommendation.model.js')();
    var Disease         = require('../../../src/models/Disease.model.js')();

    var dummyData = null;
    var model = null;
    beforeEach(() => {
      model = new Recommendation();

      dummyData = new Recommendation(
        '1999-12-31',
        'OVERDUE',
        new Disease('Rabies', '123123'),
        '456456456'
      );
    });

    var recommendationTextFields = [
      'date',
      'status',
      'vaccineCode'
    ];
    var recommendationObjectFields = [ 'disease' ];

    describe('new Recommendation()', function () {
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

}());
