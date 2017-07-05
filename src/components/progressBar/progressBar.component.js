(function () {
'use strict';

  module.exports = {
    bindings: {
      baseState: '@',
      progressStates: '<',
    },
    templateUrl: './components/progressBar/progressBar.template.html',
    controller: progressBarController,
  };

  progressBarController.$inject = ['$state'];
  function progressBarController ($state) {
    this.$onInit = () => {
      let visitedStates = {};

      this.numberOfStates = this.progressStates.length;
      this.progressBarPadding = 100/this.numberOfStates/2;

      this.btnSpacing = (100-(this.progressBarPadding*2))/(this.numberOfStates-1);

      this.isSrefActive = (sref) => $state.includes(this.baseState + sref);
      this.isVisitedState = (state) => !!visitedStates[state.sref];

      this.currentState = () => {
        let current = this.progressStates
                          .filter((s) => $state.includes(this.baseState + s.sref))[0];
        if (current.previous) visitedStates[current.previous.sref] = current.previous;
        return current;
      };

      this.currentIndex = () => this.progressStates.indexOf(this.currentState());

      this.percentComplete = 50;

    };
  }

}());
