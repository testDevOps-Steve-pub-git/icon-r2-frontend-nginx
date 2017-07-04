(function () {
'use strict';
    var ImmunizationRecordService = require('../../src/services/ImmunizationRecord.service.js');

    var Submitter         = require('../../src/models/Submitter.model.js')();
    var Patient           = require('../../src/models/Patient.model.js')();
    var Address           = require('../../src/models/Address.model.js')();
    var ImmunizationGroup = require('../../src/models/ImmunizationGroup.model.js')();
    var Immunization      = require('../../src/models/Immunization.model.js')();
    var Agent             = require('../../src/models/Agent.model.js')();
    var Trade             = require('../../src/models/Trade.model.js')();
    var Disease           = require('../../src/models/Disease.model.js')();
    var SessionData       = require('../../src/models/SessionData.model.js')();
    var Token             = require('../../src/models/Token.model.js')();


/* Initialize the ImmunizationRecordSubmission for the Sam Smith scenario. ****/
    var submission = ImmunizationRecordService();

    submission.setSubmitter(new Submitter(
        'Sam', 'Smith',
        'sam.smith@gmail.com', 'sam.smith@gmail.com',
        'mobile', '(226) 237-1196', '',
        'home',   '(226) 123-3456', '789',
        'Child'
    ));

    submission.setPatient(new Patient(
        'Jonathan', 'Norbert', 'Smith',
        '2011-12-22',
        'Keppel-Sarawak Elementary', '291030',
        '4689-201-194',
        '5WDS-B85-WC2',
        'male'
    ));

    submission.setAddress(new Address(
        'Owen Sound', 'ON', 'N4K3Y8',
        '456', 'Alpha', 'Street', 'North', 'Apt 13',
        'Line 2',
        '123', 'Little Italy',
        'A', 'RR5'
    ));

    submission.setRetrievedImmunizations([
        new Immunization('2001-01-01', false, new Agent('123', 'ABC'), new Trade(), 'Dr. Evil',      'Ontario'),
        new Immunization('2002-02-02', false, new Agent('123', 'ABC'), new Trade(), 'Nurse Ratchet', 'Vancouver'),
        new Immunization('2003-03-03', false, new Agent('123', 'ABC'), new Trade(), 'Dr. Strange',   'Zimbabwe'),
        new Immunization('2004-04-04', false, new Agent('123', 'ABC'), new Trade(), 'Dr. Zhivago',   'Texas'),
        new Immunization('2004-04-04', false, new Agent('123', 'ABC'), new Trade(), 'Dr. Zhivago',   'Texas')
    ]);

    submission.setNewImmunizations([
        new Immunization('2003-03-03', false, new Agent('123', 'ABC'), new Trade(), 'Dr. Strange',   'Zimbabwe'),
        new Immunization('2001-01-01', false, new Agent('123', 'ABC'), new Trade(), 'Dr. Evil',      'Ontario'),
        new Immunization('2005-05-05', true,  new Agent('123', 'ABC'), new Trade(), 'Dr. Octopus',   'France'),
        new Immunization('2001-01-01', false, new Agent('123', 'ABC'), new Trade(), 'Dr. Evil',      'Ontario')
    ]);

    submission.setSessionData(new SessionData(
        new Token(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGh1IiwiYXVkIjoiSUNPTi1TZXJ2ZXIiLCJzZXNzaW9uSWQiOiJHQkhVLUhiMml0ZWYiLCJpYXQiOjE0ODMzOTM1MjUsImV4cCI6MTQ4MzM5ODkyNX0.Ah3YUOsCfRGzRuJzMt4_C3dhyBcon23L_MqcQPLx9AU',
          {
            'role':       'phu',
            'aud':        'ICON-Server',
            'sessionId':  'GBHU-Hb2itef',
            'iat':        1483393525,
            'exp':        1483398925
          }
        ),
        new Token(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGh1IiwiYXVkIjoiSUNPTi1TZXJ2ZXIiLCJ0eElkIjoiR0JIVS0zUlhGNTZXWUIiLCJpYXQiOjE0ODMzOTM3NDUsImV4cCI6MTQ4MzM5OTE0NX0.GaepxI_sIpgHUeIXiUOQ5WRhvxpp1-ZOED3s5VanD6I',
          {
            'role': 'phu',
            'aud':  'ICON-Server',
            'txId': 'GBHU-3RXF56WYB',
            'iat':  1483393745,
            'exp':  1483399145
          }
        ),
        8 // Numeric code generated from gating questions
    ));

/* Export the initialized ImmunizationRecordSubmission as the module data. ****/
    module.exports = submission;

}());
