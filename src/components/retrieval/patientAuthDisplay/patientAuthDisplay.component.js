/**
 * Created on 2017-01-27.
 * Component for patient display when submitter and patient are different
 */

/* @ngInject */
function patientAuthDisplay$ctrl (ImmunizationRecordService) {
  this.patient = ImmunizationRecordService.getPatient()
}

export default {
  name: 'patientAuthDisplay',
  component: {
    bindings: {
      clientInfo: '<',
      page: '@'
    },
    templateUrl: './components/retrieval/patientAuthDisplay/patientAuthDisplay.template.html',
    controller: patientAuthDisplay$ctrl
  }
}
