(function () {
'use strict';

  var expect = require('chai').expect;
  var TypeCheck = require('../lib/TypeCheck.js');

  describe('Disease', function () {
    var Disease = require('../../../src/models/Disease.model.js')();
    var dummyData = new Disease('Rabies', '123456789');

    var model = null;
    beforeEach(function () { model = new Disease(); })

    var diseaseTextFields = [
      'name',
      'snomed'
    ];

    describe('new Disease()', function () {
      it('should construct an empty model without undefined values', function () {
        TypeCheck.areAllString(model, diseaseTextFields, '');
      });
    });

    describe('.clone()', function () {
      it('should return a cloned object without reference pointers to cloned values', function () {
        var clonedModel = model.clone();

        // Set the cloned values based on dummy data
        diseaseTextFields
        .forEach(function (key) {
          clonedModel[key] = dummyData[key];
        });

        // Check that the cloned model is changed, but the original is unaffected
        diseaseTextFields
        .forEach(function (key) {
          expect(clonedModel[key]).to.equal(dummyData[key]);
          expect(model[key]).to.equal('');
        });
      });
    });
  });

}());
