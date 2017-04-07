/**
 * Created on 2017-01-30.
 * Component for the edit button on the review page
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      buttonText: '@',
      goToRoute: '@',
      buttonId: '@',
    },
    templateUrl: './components/review/editButton/editButton.template.html',
    controller: editButtonController,
  };

  editButtonController.$inject = ['EditReviewService', '$state'];
  function editButtonController (EditReviewService, $state) {

    this.$onInit = () => {
      /** Function Declarations */
      this.editPage = editPage;
    };

    /**
     * Route to page, and set fromReviewPage to true, for next prev buttons
     */
    function editPage() {
      EditReviewService.setFromReviewPage(true);
      $state.go(this.goToRoute);
    }
  }

})();
