import Address      from '../../src/models/Address.model'
import Agent        from '../../src/models/Agent.model'
import Disease      from '../../src/models/Disease.model'
import Immunization from '../../src/models/Immunization.model'
import Patient      from '../../src/models/Patient.model'
import SessionData  from '../../src/models/SessionData.model'
import Submitter    from '../../src/models/Submitter.model'
import Token        from '../../src/models/Token.model'
import Trade        from '../../src/models/Trade.model'
import ImmunizationRecordSubmission from '../../src/models/ImmunizationRecordSubmission.model'

(function () {
'use strict'
    var ImmunizationRecordService = require('../../src/services/ImmunizationRecord.service.js')

/* Initialize the ImmunizationRecordSubmission for the Sam Smith scenario. ****/
    var submission = ImmunizationRecordService(null, ImmunizationRecordSubmission.model)

    submission.setSubmitter(new Submitter.model(
        'Sam', 'Smith',
        'sam.smith@gmail.com', 'sam.smith@gmail.com',
        'mobile', '(226) 237-1196', '',
        'home',   '(226) 123-3456', '789',
        'Child'
    ))

    submission.setPatient(new Patient.model(
        'Jonathan', 'Norbert', 'Smith',
        '2011-12-22',
        'Keppel-Sarawak Elementary', '291030',
        '4689-201-194',
        '5WDS-B85-WC2',
        'male'
    ))

    submission.setAddress(new Address.model(
        'Owen Sound', 'ON', 'N4K3Y8',
        '456', 'Alpha', 'Street', 'North', 'Apt 13',
        'Line 2',
        '123', 'Little Italy',
        'A', 'RR5'
    ))

    submission.setRetrievedImmunizations([
        new Immunization.model('2001-01-01', false, new Agent.model('123', 'ABC'), new Trade.model(), 'Dr. Evil',      'Ontario'),
        new Immunization.model('2002-02-02', false, new Agent.model('123', 'ABC'), new Trade.model(), 'Nurse Ratchet', 'Vancouver'),
        new Immunization.model('2003-03-03', false, new Agent.model('123', 'ABC'), new Trade.model(), 'Dr. Strange',   'Zimbabwe'),
        new Immunization.model('2004-04-04', false, new Agent.model('123', 'ABC'), new Trade.model(), 'Dr. Zhivago',   'Texas'),
        new Immunization.model('2004-04-04', false, new Agent.model('123', 'ABC'), new Trade.model(), 'Dr. Zhivago',   'Texas')
    ])

    submission.setNewImmunizations([
        new Immunization.model('2003-03-03', false, new Agent.model('123', 'ABC'), new Trade.model(), 'Dr. Strange',   'Zimbabwe'),
        new Immunization.model('2001-01-01', false, new Agent.model('123', 'ABC'), new Trade.model(), 'Dr. Evil',      'Ontario'),
        new Immunization.model('2005-05-05', true,  new Agent.model('123', 'ABC'), new Trade.model(), 'Dr. Octopus',   'France'),
        new Immunization.model('2001-01-01', false, new Agent.model('123', 'ABC'), new Trade.model(), 'Dr. Evil',      'Ontario')
    ])

    submission.setSessionData(new SessionData.model(
        new Token.model(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGh1IiwiYXVkIjoiSUNPTi1TZXJ2ZXIiLCJzZXNzaW9uSWQiOiJHQkhVLUhiMml0ZWYiLCJpYXQiOjE0ODMzOTM1MjUsImV4cCI6MTQ4MzM5ODkyNX0.Ah3YUOsCfRGzRuJzMt4_C3dhyBcon23L_MqcQPLx9AU',
          {
            'role':       'phu',
            'aud':        'ICON-Server',
            'sessionId':  'GBHU-Hb2itef',
            'iat':        1483393525,
            'exp':        1483398925
          }
        ),
        new Token.model(
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
    ))

/* Export the initialized ImmunizationRecordSubmission as the module data. ****/
    module.exports = submission

}())
