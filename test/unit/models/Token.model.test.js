import Token from '../../../src/models/Token.model'

import {expect}   from 'chai'
import TypeCheck  from '../lib/TypeCheck'

(function () {
'use strict'

  describe('Token', function () {
    var dummyData = require('../../fixtures/ImmunizationRecordService.SamSmith.data.js')

    var model = null
    beforeEach(function () { model = new Token.model() })

    var tokenTextFields = [ 'encoded' ]

    describe('new Token()', function () {
      it('should construct an empty model without undefined values', function () {
        TypeCheck.areAllString(model, tokenTextFields, '')
      })
    })

    describe('.clone()', function () {
      it('should return a cloned object without reference pointers to cloned values', function () {
        var clonedModel = model.clone()

        // Set the cloned values based on dummy data
        tokenTextFields
            .forEach(function (key) {
              clonedModel[key] = dummyData.getSessionData().sessionToken[key]
            })

        // Check that the cloned model is changed, but the original is unaffected
        tokenTextFields
            .forEach(function (key) {
              expect(clonedModel[key]).to.equal(dummyData.getSessionData().sessionToken[key])
              expect(model[key]).to.equal('')
            })
      })
    })
  })

}())
