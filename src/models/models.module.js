/**
 * @name icon.models
 * @module icon.models
 * @namespace icon.models
 */
(function () {
'use strict';

  angular.module('icon.models', [])
    .service('Address', [require('./Address.model.js')])
    .service('SessionData', [
        'Token',
        require('./SessionData.model.js')
    ])
    .service('Agent', [require('./Agent.model.js')])
    .service('Disease', [require('./Disease.model.js')])
    .service('Immunization', [
        'Agent', 'Trade',
        require('./Immunization.model.js')
    ])
    .service('ImmunizationGroup', [require('./ImmunizationGroup.model.js')])
    .service('ImmunizationRecordSubmission', [
        'Address', 'Patient', 'SessionData', 'Submitter',
        require('./ImmunizationRecordSubmission.model.js')
    ])
    .service('Lot', [require('./Lot.model.js')])
    .service('Patient', [require('./Patient.model.js')])
    .service('Recommendation', [
      'Disease',
      require('./Recommendation.model.js')
    ])
    .service('Submitter', [require('./Submitter.model.js')])
    .service('Token', [require('./Token.model.js')])
    .service('Trade', [require('./Trade.model.js')])

}());
