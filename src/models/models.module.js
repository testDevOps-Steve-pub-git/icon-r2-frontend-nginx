import Address from './Address.model'
import Agent from './Agent.model'
import Disease from './Disease.model'
import Immunization from './Immunization.model'
import Lot from './Lot.model'
import ImmunizationRecordSubmission from './ImmunizationRecordSubmission.model'
import Patient from './Patient.model'
import Recommendation from './Recommendation.model'
import Submitter from './Submitter.model'
import Token from './Token.model'
import Trade from './Trade.model'

angular.module('icon.models', [])
  .service(Address.name, [() => Address.model])
  .service(Agent.name, [() => Agent.model])
  .service(Disease.name, [() => Disease.model])
  .service(Immunization.name, [() => Immunization.model])
  .service(Lot.name, [() => Lot.model])
  .service(ImmunizationRecordSubmission.name, [() => ImmunizationRecordSubmission.model])
  .service(Patient.name, [() => Patient.model])
  .service(Recommendation.name, [() => Recommendation.model])
  .service(Submitter.name, [() => Submitter.model])
  .service(Token.name, [() => Token.model])
  .service(Trade.name, [() => Trade.model])
