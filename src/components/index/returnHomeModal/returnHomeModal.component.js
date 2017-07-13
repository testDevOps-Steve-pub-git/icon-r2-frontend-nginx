/**
 * Created on 2017-04-03.
 * Modal that informs user they will lose unsaved information if they return to home without submitting
 */
/* @ngInject */
function returnHomeModal$ctrl ($state) {
  this.ok = (modalData) => {
    this.$close({
      result: modalData
    })
  }
}

export default {
  name: 'returnHomeModal',
  component: {
    bindings: {
      $close: '&'
    },
    templateUrl: './components/index/returnHomeModal/returnHomeModal.template.html',
    controller: returnHomeModal$ctrl
  }
}
