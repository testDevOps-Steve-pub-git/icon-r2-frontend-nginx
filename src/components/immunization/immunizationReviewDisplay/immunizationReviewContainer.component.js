/**
 * Created on 2017-02-16.
 * Component to hold all individual immunizations
 * Automatically sorted by date
 */
(function() {
'use strict';

  module.exports = {
    template: `
      <div ng-if="$ctrl.groupByDisplay === 'date'" ng-repeat="immunizations in $ctrl.immunizationsGroupedByDate track by $index">
        <immunization-review-display-date
          immunizations="immunizations"
          patient="$ctrl.patient">
        </immunization-review-display-date>
      </div>

      <div ng-if="$ctrl.groupByDisplay === 'agent'" ng-repeat="immunizations in $ctrl.immunizationsGroupedByAgent track by $index">
        <immunization-review-display-agent
          immunizations="immunizations"
          patient="$ctrl.patient">
        </immunization-review-display-agent>
      </div>
    `,
    bindings: {
      immunizations: '<',
      patient: '<',
    },
    controller: immunizationReviewDisplayController
  };

  immunizationReviewDisplayController.$inject = ['GatingQuestionService', 'GroupsOf'];
  function immunizationReviewDisplayController(GatingQuestionService, GroupsOf) {

    this.$onInit = ()=> {
      /* Grouping choice */
      let gatingQuestions = GatingQuestionService.getGatingChoices();
      this.groupByDisplay = gatingQuestions.question4Choice;

      this.immunizationsGroupedByAgent = GroupsOf.immunization.byAgentTrade(this.immunizations);
      this.immunizationsGroupedByDate = GroupsOf.immunization.byDate(this.immunizations);
    };
  }

})();
