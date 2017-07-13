/**
 * Created on 2017-02-23.
 * Component for modal when a user has authenticated and needs to take a survey
 */
/* @ngInject */
function authModalSurvey$ctrl ($state) {
  this.close = (modalData) => {
    this.$close({
      result: modalData
    })
  }

  this.ok = (modalData) => {
    this.$close({
      result: modalData
    })
    $state.transitionTo('welcome')
  }
}

export default {
  name: 'authSurvey',
  component: {
    bindings: {
      $close: '&'
    },
    templateUrl: './components/retrieval/authModalSurvey/authModalSurvey.template.html',
    controller: authModalSurvey$ctrl
  }
}
