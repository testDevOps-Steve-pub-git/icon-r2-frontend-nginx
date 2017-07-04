import Disease from '../../../src/models/Disease.model'

import {expect} from 'chai'
import TypeCheck from '../lib/TypeCheck'

(function () {
'use strict'

  describe('Disease', function () {
    var dummyData = new Disease.model('Rabies', '123456789')

    var model = null;
    beforeEach(function () { model = new Disease.model() })

    var diseaseTextFields = [
      'name',
      'snomed'
    ]

    describe('new Disease.model()', function () {
      it('should construct an empty model without undefined values', function () {
        TypeCheck.areAllString(model, diseaseTextFields, '')
      })
    })

    describe('.clone()', function () {
      it('should return a cloned object without reference pointers to cloned values', function () {
        var clonedModel = model.clone()

        // Set the cloned values based on dummy data
        diseaseTextFields
        .forEach(function (key) {
          clonedModel[key] = dummyData[key]
        })

        // Check that the cloned model is changed, but the original is unaffected
        diseaseTextFields
        .forEach(function (key) {
          expect(clonedModel[key]).to.equal(dummyData[key])
          expect(model[key]).to.equal('')
        })
      })
    })
  })

}())
