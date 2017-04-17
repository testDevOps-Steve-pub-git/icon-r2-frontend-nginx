(function () {
'use strict';

  module.exports = {
    controller: yellowCardRecommendationsController,
    template: `
      <div class="row col-xs-12 col-sm-8 col-sm-offset-2">
        <div><h5 /> </div>
        <p>{{ 'yellowCardRecommendations.YC_CAVEAT' | translate }}</p>
        <hr />

        <h2>{{ 'yellowCardRecommendations.HEADING' | translate }}</h2>

        <p translate="{{ 'yellowCardRecommendations.INTRO' | translate }}" translate-compile></p>

        <ul>
          <li ng-repeat="recommendation in $ctrl.recommendations">
            <strong>{{recommendation.disease.name}}</strong>
          </li>
        </ul>

        <p>{{ 'yellowCardRecommendations.NOTE' | translate }}</p>

        <p translate="yellowCardRecommendations.FOR_MORE_INFO" translate-compile></p>
      </div>

      <div class="row col-xs-12 col-sm-8 col-sm-offset-2">
        <button ng-click="$ctrl.openYellowCardPdf()" class="btn btn-primary">{{ 'yellowCardRecommendations.PRINT_BUTTON' | translate }}</button>
      </div>
    `,
  };

  yellowCardRecommendationsController.$inject = ['ImmunizationRecordService', 'PdfMaker'];
  function yellowCardRecommendationsController (ImmunizationRecordService, PdfMaker) {
    this.$onInit = () => {
      this.recommendations = ImmunizationRecordService.getRecommendations();
      this.openYellowCardPdf = PdfMaker.openYellowCardPdf;
    };
  }

}());
