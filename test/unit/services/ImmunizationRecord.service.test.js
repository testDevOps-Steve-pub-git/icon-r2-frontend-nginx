(function () {
'use strict';

    var expect = require('chai').expect;

    var ImmunizationRecordService = require('../../../src/services/ImmunizationRecord.service.js');

    var Patient =            require('../../../src/models/Patient.model.js')();
    var Submitter =         require('../../../src/models/Submitter.model.js')();
    var Address =           require('../../../src/models/Address.model.js')();
    var SessionData =       require('../../../src/models/SessionData.model.js')();
    var ImmunizationGroup = require('../../../src/models/ImmunizationGroup.model.js')();

    var dummyData = require('../../fixtures/ImmunizationRecordService.SamSmith.data.js');

    describe('ImmunizationRecordService', function () {
        var immunizationRecordService = null;
        beforeEach(function(){
            immunizationRecordService = ImmunizationRecordService();
        });

        var submitterFields = [
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
        ];
        var clientFields = [
            'firstName',
            'middleName',
            'lastName',
            'dateOfBirth',
            'schoolOrDayCare',
            'schoolOrDayCareIdentifier',
            'healthCardNumber',
            'oiid',
            'gender'
        ];
        var addressFields = [
            'streetNumber',
            'streetName',
            'streetType',
            'streetDirection',
            'unitNumber',
            'line2',
            'city',
            'province',
            'postalCode'
        ];
        var sessionDataFields = [
            'sessionToken',
            'transactionToken'
        ];

/* Submitter get/setters ******************************************************/

        describe('.getSubmitter()', function () {
            var submitter = null;
            beforeEach(function () {
                submitter = immunizationRecordService.getSubmitter();
            });

            it('should get a Submitter object with empty fields', function () {
                // Check to make sure that the uninitialized object has only empty fields.
                var areAllFieldsBlank = true;
                submitterFields.forEach(function (fieldKey) {
                    areAllFieldsBlank = areAllFieldsBlank
                                        && submitter[fieldKey] === '';
                });
                expect(areAllFieldsBlank).to.be.true;
            });

            it('should get a cloned Submitter object which can be mutated without changing the service\'s field', function () {
                // Mutate the cloned object's fields (arbitrary value)
                submitterFields.forEach(function (fieldKey) {
                    submitter[fieldKey] = 'changed';
                });
                // Retrieve another clone of the object, and check to make sure that none of it's
                //      fields have been mutated because of retained reference pointers.
                var areAllFieldsBlank = true;
                var originalSubmitter = immunizationRecordService.getSubmitter();
                submitterFields.forEach(function (fieldKey) {
                    areAllFieldsBlank = areAllFieldsBlank
                                        && originalSubmitter[fieldKey] === '';
                });
                expect(areAllFieldsBlank).to.be.true;
            });
        });

        describe('.setSubmitter(...)', function () {
            var updatedSubmitter = dummyData.getSubmitter();
            beforeEach(function () {
                immunizationRecordService.setSubmitter(updatedSubmitter);
            });

            it('should set the submitter', function () {
                var retrievedSubmitter = immunizationRecordService.getSubmitter();
                // Check that the retrieved object's fields were correctly set.
                var areAllFieldsSame = true;
                submitterFields.forEach(function (fieldKey) {
                    areAllFieldsSame = areAllFieldsSame
                                       && updatedSubmitter[fieldKey] === retrievedSubmitter[fieldKey];
                });
                expect(areAllFieldsSame).to.be.true;
            });
        });


/* Patient get/setters *********************************************************/

        describe('.getPatient()', function () {
            var client = null;
            beforeEach(function () {
                client = immunizationRecordService.getPatient();
            });

            it('should get a Patient object with empty fields', function () {
                // Check to make sure that the uninitialized object has only empty fields.
                var areAllFieldsBlank = true;
                clientFields.forEach(function (fieldKey) {
                    areAllFieldsBlank = areAllFieldsBlank
                                        && client[fieldKey] === '';
                });
                expect(areAllFieldsBlank).to.be.true;
            });

            it('should get a cloned Patient object which can be mutated without changing the service\'s field', function () {
                // Mutate the cloned object's fields
                clientFields.forEach(function (fieldKey) {
                    client[fieldKey] = 'changed';
                });
                // Retrieve another clone of the object, and check to make sure that none of it's
                //      fields have been mutated because of retained reference pointers.
                var areAllFieldsBlank = true;
                var originalPatient = immunizationRecordService.getPatient();
                clientFields.forEach(function (fieldKey) {
                    areAllFieldsBlank = areAllFieldsBlank
                                        && originalPatient[fieldKey] === '';
                });
                expect(areAllFieldsBlank).to.be.true;
            });
        });

        describe('.setPatient(...)', function () {
            var updatedPatient = dummyData.getPatient();

            beforeEach(function () {
                immunizationRecordService.setPatient(updatedPatient);
            });

            it('should set the client', function () {
                var retrievedPatient = immunizationRecordService.getPatient();

                var areAllFieldsSame = true;
                clientFields.forEach(function (fieldKey) {
                    areAllFieldsSame = areAllFieldsSame
                                        && updatedPatient[fieldKey] === retrievedPatient[fieldKey];
                });

                expect(areAllFieldsSame)
                    .to.be.true;
            });
        });


/* Address get/setters ********************************************************/

        describe('.getAddress()', function () {
            var address = null;
            beforeEach(function () {
                address = immunizationRecordService.getAddress();
            });

            it('should get an Address object with empty fields', function () {
                // Check to make sure that the uninitialized object has only empty fields.
                var areAllFieldsBlank = true;
                addressFields.forEach(function (fieldKey) {
                    areAllFieldsBlank = areAllFieldsBlank
                                        && address[fieldKey] === '';
                });
                expect(areAllFieldsBlank).to.be.true;
            });

            it('should get a cloned Address object which can be mutated without changing the service\'s field', function () {
                // Mutate the cloned object's fields (arbitrary value)
                addressFields.forEach(function (fieldKey) {
                    address[fieldKey] = 'changed';
                });
                // Retrieve another clone of the object, and check to make sure that none of it's
                //      fields have been mutated because of retained reference pointers.
                var areAllFieldsBlank = true;
                var originalAddress = immunizationRecordService.getAddress();
                addressFields.forEach(function (fieldKey) {
                    areAllFieldsBlank = areAllFieldsBlank
                                        && originalAddress[fieldKey] === '';
                });
                expect(areAllFieldsBlank).to.be.true;
            });
        });

        describe('.setAddress(...)', function () {
            var updatedAddress = dummyData.getAddress();
            beforeEach(function () {
                immunizationRecordService.setAddress(updatedAddress);
            });

            it('should set the address', function () {
                var retrievedAddress = immunizationRecordService.getAddress();
                // Check that the retrieved object's fields were correctly set.
                var areAllFieldsSame = true;
                addressFields.forEach(function (fieldKey) {
                    areAllFieldsSame = areAllFieldsSame
                                       && updatedAddress[fieldKey] === retrievedAddress[fieldKey];
                });
                expect(areAllFieldsSame).to.be.true;
            });
        });


/* SessionData get/setters ****************************************************/

        describe('.getSessionData()', function () {
            var sessionData = null;
            beforeEach(function () {
                sessionData = immunizationRecordService.getSessionData();
            });

            it('should get an SessionData object with empty fields', function () {
                // Check to make sure that the uninitialized object has only empty fields.
                var areAllFieldsBlank = true;
                sessionDataFields.forEach(function (fieldKey) {
                    areAllFieldsBlank = areAllFieldsBlank
                                        && sessionData[fieldKey].encoded === '';
                });
                expect(areAllFieldsBlank).to.be.true;
            });

            it('should get a cloned SessionData object which can be mutated without changing the service\'s field', function () {
                // Mutate the cloned object's fields (arbitrary value)
                sessionDataFields.forEach(function (fieldKey) {
                    sessionData[fieldKey].encoded = 'changed';
                });
                // Retrieve another clone of the object, and check to make sure that none of it's
                //      fields have been mutated because of retained reference pointers.
                var areAllFieldsBlank = true;
                var originalSessionData = immunizationRecordService.getSessionData();
                sessionDataFields.forEach(function (fieldKey) {
                    areAllFieldsBlank = areAllFieldsBlank
                                        && originalSessionData[fieldKey].encoded === '';
                });
                expect(areAllFieldsBlank).to.be.true;
            });
        });

        describe('.setSessionData(...)', function () {
            var updatedSessionData = dummyData.getSessionData();
            beforeEach(function () {
                immunizationRecordService.setSessionData(updatedSessionData);
            });

            it('should set the sessionData', function () {
                var retrievedSessionData = immunizationRecordService.getSessionData();
                // Check that the retrieved object's fields were correctly set.
                var areAllFieldsSame = true;
                sessionDataFields.forEach(function (fieldKey) {
                    areAllFieldsSame = areAllFieldsSame
                                       && updatedSessionData[fieldKey].encoded === retrievedSessionData[fieldKey].encoded;
                });
                expect(areAllFieldsSame).to.be.true;
            });
        });



/* NewImmunization get/setters **********************************************/

        describe('.getNewImmunizations()', function () {
            it('should initially get an empty collection', function () {
                expect(immunizationRecordService.getNewImmunizations().length).to.equal(0);
            });
        });

        describe('.setNewImmunizations(...)', function () {
            var updatedNewImmunizations = dummyData.getNewImmunizations();
            beforeEach(function () {
                immunizationRecordService.setNewImmunizations(updatedNewImmunizations);
            });

            it('should have an updated quantity of immunizations, matching collection used to set', function () {
                expect(immunizationRecordService.getNewImmunizations().length)
                    .to.equal(updatedNewImmunizations.length);
            });

            it('should NOT allow retrieved collection to retain reference pointers to original collection', function () {
                var retrievedNewImmunizations = immunizationRecordService.getNewImmunizations();
                retrievedNewImmunizations.pop();

                expect(immunizationRecordService.getNewImmunizations().length)
                    .to.equal(updatedNewImmunizations.length);
            });
        });


/* RetrievedImmunization get/setters **********************************************/

        describe('.getRetrievedImmunizations()', function () {
            it('should initially get an empty collection', function () {
                expect(immunizationRecordService.getRetrievedImmunizations().length).to.equal(0);
            });
        });

        describe('.setRetrievedImmunizations(...)', function () {
            var updatedRetrievedImmunizations = dummyData.getRetrievedImmunizations();
            beforeEach(function () {
                immunizationRecordService.setRetrievedImmunizations(updatedRetrievedImmunizations);
            });

            it('should have an updated quantity of immunizations, matching collection used to set', function () {
                expect(immunizationRecordService.getRetrievedImmunizations().length)
                    .to.equal(updatedRetrievedImmunizations.length);
            });

            it('should NOT allow retrieved collection to retain reference pointers to original collection', function () {
                var retrievedRetrievedImmunizations = immunizationRecordService.getRetrievedImmunizations();
                retrievedRetrievedImmunizations.pop();

                expect(immunizationRecordService.getRetrievedImmunizations().length)
                    .to.equal(updatedRetrievedImmunizations.length);
            });
        });
    });

}());
