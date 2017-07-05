/* @ngInject */
function welcomeLoginChoice$ctrl ($state, MiscData) {

  this.$onInit = ()=> {
    this.skipAUP = MiscData.getSkipAUP();

    /*function declaration*/
    this.goToAUP = goToAUP;
  }


  /**
   * Routes user to AUP, relay action to follow AUP.
   * @param {string} action - "SUBMISSION" or "RETRIEVAL"
   */
  function goToAUP (action) {
    if(this.skipAUP) {
      switch (action) {
        case 'SUBMISSION':
          $state.go('submission', {action: action}) // No action required here, submission specific route chosen.
          break

        case 'RETRIEVAL':
          $state.go('verification', {action: action})
          break

        default:
          console.error(`
          Action parameter "${action}" is not permitted!
          Re-routing to "welcome"...
        `)
          $state.go('welcome')
          break
      }
    }
    else {
      $state.go('aup', {action: action});
    }
  }
}

export default {
  name:       'welcomeLoginChoice',
  component: {
    css: ['./components/welcome/welcomeLogin/welcomeLoginChoice.css'],
    templateUrl: './components/welcome/welcomeLogin/welcomeLoginChoice.template.html',
    bindings: {},
    controller: welcomeLoginChoice$ctrl
  }
}