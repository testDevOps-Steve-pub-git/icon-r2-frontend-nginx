/* @ngInject */
function patientSelfCaptureController (){
  // for future purposes
}
export default {
  name: 'roleCapture',
  component: {
    templateUrl: './components/form/roleCapture/roleCapture.template.html',
    bindings: {
      role: '=',
      form: '=',
    },
    transclude: {
      'label': '?label'
    },
    controller: patientSelfCaptureController,
  }
};
