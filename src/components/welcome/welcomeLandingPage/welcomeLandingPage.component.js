/* @ngInject */
function welcomeLandingPage$ctrl (Multitenancy) {
  let $ctrl = this;

  Multitenancy.getPhuKeys()
  .then((phuKeys) => {
    $ctrl.multitenancy = phuKeys;
  })
}

export default {
  name:       'welcomeLandingPage',
  component:  {
    templateUrl: './components/welcome/welcomeLandingPage/welcomeLandingPage.template.html',
    bindings: {},
    controller: welcomeLandingPage$ctrl
  },
}
