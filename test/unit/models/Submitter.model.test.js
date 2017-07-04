import Submitter from '../../../src/models/Submitter.model'

import {expect}   from 'chai'
import TypeCheck  from '../lib/TypeCheck'

(function () {
'use strict'

    describe('Submitter', function () {
        var dummyData = require('../../fixtures/ImmunizationRecordService.SamSmith.data.js')

        var model = null
        beforeEach(function () { model = new Submitter.model() })

        var submitterTextFields = [
            'firstName',
            'lastName',
            'email',
            'emailConfirm',
            'phone1Number',
            'phone1Type',
            'phone1Ext',
            'phone2Number',
            'phone2Type',
            'phone2Ext',
            'relationshipToPatient'
        ]

        describe('new Submitter.model()', function () {
            it('should construct an empty model without undefined values', function () {
                TypeCheck.areAllString(model, submitterTextFields, '')
            })
        })

        describe('.clone()', function () {
            it('should return a cloned object without reference pointers to cloned values', function () {
                var clonedModel = model.clone()

                // Set the cloned values based on dummy data
                submitterTextFields
                        .forEach(function (key) {
                            clonedModel[key] = dummyData.getSubmitter()[key];
                        })

                // Check that the cloned model is changed, but the original is unaffected
                submitterTextFields
                        .forEach(function (key) {
                            expect(clonedModel[key]).to.equal(dummyData.getSubmitter()[key])
                            expect(model[key]).to.equal('')
                        })
            })
        })
    })

}())
