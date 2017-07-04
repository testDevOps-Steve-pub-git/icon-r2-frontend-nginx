// TODO: factor out unused models and delete artifacts such as imports
// (function () {
// 'use strict';
//
//   var expect = require('chai').expect;
//   var TypeCheck = require('../lib/TypeCheck.js');
//
//   describe('SessionData', function () {
//     var SessionData = require('../../../src/models/SessionData.model.js')();
//     var dummyData = require('../../fixtures/ImmunizationRecordService.SamSmith.data.js');
//
//     var model = null;
//     beforeEach(function () { model = new SessionData(); })
//
//     var sessionDataTextFields = [
//       'sessionToken',
//       'transactionToken'
//     ];
//
//     describe('new SessionData()', function () {
//       it('should construct an empty model without undefined values', function () {
//         TypeCheck.areAllObject(model, sessionDataTextFields);
//       });
//     });
//
//     describe('.clone()', function () {
//       it('should return a cloned object without reference pointers to cloned values', function () {
//         var clonedModel = model.clone();
//
//         // Set the cloned values based on dummy data
//         sessionDataTextFields
//             .forEach(function (key) {
//               clonedModel[key] = dummyData.getSessionData()[key];
//             });
//
//         // Check that the cloned model is changed, but the original is unaffected
//         sessionDataTextFields
//             .forEach(function (key) {
//               expect(clonedModel[key].encoded).to.equal(dummyData.getSessionData()[key].encoded);
//               expect(clonedModel[key].decoded).to.deep.equal(dummyData.getSessionData()[key].decoded);
//             });
//       });
//     });
//   });
//
// }());
