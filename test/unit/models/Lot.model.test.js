import Lot from '../../../src/models/Lot.model'
import {expect}   from 'chai'
import TypeCheck  from '../lib/TypeCheck'

describe('Lot', () => {
  const dummyData = new Lot.model('ABC-123-456-X', '1999-12-31')

  let model = null
  beforeEach(() => { model = new Lot.model() })

  const lotTextFields = [
    'number',
    'expiry'
  ]

  describe('new Lot.model()', () => {
    it('should construct an empty model without undefined values', () => {
      TypeCheck.areAllString(model, lotTextFields, '')
    })
  })

  describe('.clone()', () => {
    it('should return a cloned object without reference pointers to cloned values', () => {
      let clonedModel = model.clone()

      // Set the cloned values based on dummy data
      lotTextFields
      .forEach((key) => { clonedModel[key] = dummyData[key]; })

      // Check that the cloned model is changed, but the original is unaffected
      lotTextFields
      .forEach((key) => {
        expect(clonedModel[key]).to.equal(dummyData[key])
        expect(model[key]).to.equal('')
      })
    })
  })
})
