/**
 * Created on 2017-01-30.
 * Component for the edit button on the review page
 */
/* @ngInject */
function editButton$ctrl (EditReviewService, $state) {
  this.$onInit = () => {
    /** Function Declarations */
    this.editPage = editPage
  }

  /**
   * Route to page, and set fromReviewPage to true, for next prev buttons
   */
  function editPage () {
    EditReviewService.setFromReviewPage(true)
    $state.go(this.goToRoute)
  }
}

export default {
  name: 'editButton',
  component: {
    bindings: {
      buttonText: '@',
      goToRoute: '@',
      buttonId: '@'
    },
    templateUrl: './components/review/editButton/editButton.template.html',
    controller: editButton$ctrl
  }
}
