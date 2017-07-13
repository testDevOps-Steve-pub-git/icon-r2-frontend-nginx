import Token      from '../../../src/models/Token.model'
import {expect}   from 'chai'
import TypeCheck  from '../lib/TypeCheck'
import dummyData  from '../../fixtures/ImmunizationRecordService.SamSmith.data.js'

describe('Token', function () {
  var model = null
  beforeEach(function () { model = new Token.model() })

  var tokenTextFields = [ 'encoded' ]

  describe('new Token()', function () {
    it('should construct an empty model without undefined values', function () {
      TypeCheck.areAllString(model, tokenTextFields, '')
    })
  })
})
