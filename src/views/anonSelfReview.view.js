anonSelfReviewController.$inject = ['ImmunizationRecordService'];
function anonSelfReviewController (ImmunizationRecordService) {

  this.$onInit = () => {
    this.clientInfo = ImmunizationRecordService.getPatient();
    this.submitterInfo = ImmunizationRecordService.getSubmitter();
    this.addressInfo = ImmunizationRecordService.getAddress();
    this.immunizations = ImmunizationRecordService.getNewImmunizations();
  }
}

module.exports = {
  controller: anonSelfReviewController,
  template: `
    <h1>{{ 'anonSelfReview.REVIEW' | translate}}</h1>
    <h3>{{ 'anonSelfReview.REVIEW_INSTRUCTION_HEADER' | translate }}</h3>
    <p>{{ 'anonSelfReview.REVIEW_INSTRUCTION_BODY' | translate }} </p>
    <form id="reviewForm" name="reviewForm" novalidate>
      <hr/>
      <h4>{{ 'anonSelfReview.IMMUNIZATIONS_TITLE' | translate }}</h4>

      <div class="row">
        <div class="col-xs-12">
          <immunization-review-container
            patient="$ctrl.clientInfo"
            immunizations="$ctrl.immunizations">
          </immunization-review-container>
          <p>{{ 'anonSelfReview.REVIEW_INSTRUCTION_CAVEAT' | translate }} </p>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <edit-button
            button-id="review-edit-immunizations-button"
            button-text="{{'anonSelfReview.REVIEW_EDIT_IMMS' | translate}}"
            go-to-route="^.immunizations">
          </edit-button>
        </div>
      </div>
      <hr/>

      <h4>{{ 'anonSelfReview.DOCUMENTS_TITLE' | translate }}</h4>
      <div class="row">
        <document-upload-display is-editable="false" doc-review="review"></document-upload-display>
      </div>
      <div class="row">
        <div class="col-xs-12">
           <edit-button
            button-id="review-edit-documents-button"
            button-text="{{'anonSelfReview.REVIEW_EDIT_DOX' | translate}}"
            go-to-route="^.documents">
          </edit-button>
        </div>
      </div>
      <hr/>

      <patient-self-display
        client-info="$ctrl.clientInfo"
        submitter-info="$ctrl.submitterInfo">
      </patient-self-display>
      <hr/>

      <address-display
        address-info="$ctrl.addressInfo">
      </address-display>
      <hr/>

      <submit-immunizations></submit-immunizations>
    </form>
  `
};
