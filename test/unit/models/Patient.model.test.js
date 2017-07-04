import Patient from '../../../src/models/Patient.model'

import {expect}   from 'chai'
import TypeCheck  from '../lib/TypeCheck'

(function () {
'use strict';

    describe('Patient', () => {
        var dummyData = require('../../fixtures/ImmunizationRecordService.SamSmith.data.js')

        var model = null
        beforeEach(() => { model = new Patient.model() })

        var clientTextFields = [
            'firstName',
            'middleName',
            'lastName',
            'dateOfBirth',
            'schoolOrDayCare',
            'schoolOrDayCareIdentifier',
            'healthCardNumber',
            'oiid',
            'gender'
        ]

        describe('new Patient.model()', () => {
            it('should construct an empty model without undefined values', () => {
                TypeCheck.areAllString(model, clientTextFields, '');
            })
        })

        describe('.clone()', () => {
            it('should return a cloned object without reference pointers to cloned values', () => {
                var clonedModel = model.clone()

                // Set the cloned values based on dummy data
                clientTextFields
                        .forEach(function (key) {
                            clonedModel[key] = dummyData.getPatient()[key]
                        })

                // Check that the cloned model is changed, but the original is unaffected
                clientTextFields
                        .forEach(function (key) {
                            expect(clonedModel[key]).to.equal(dummyData.getPatient()[key])
                            expect(model[key]).to.equal('')
                        })
            })
        })
    })

}())
