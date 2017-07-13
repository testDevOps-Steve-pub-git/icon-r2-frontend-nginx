/**
 * Created on 2017-01-27.
 * Component for patient display when submitter and patient are different
 */
/* @ngInject */
function patientOtherDisplay$ctrl () {}

export default {
  name: 'patientOtherDisplay',
  component: {
    bindings: {
      clientInfo: '<'
    },
    controller: patientOtherDisplay$ctrl,
    templateUrl: './components/patient/patientOtherDisplay/patientOtherDisplay.template.html'
  }
}
