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
    <h1>{{ 'progressBar.REVIEW' | translate}}</h1>
    <form id="reviewForm" name="reviewForm" novalidate>
      <h4>{{ 'anonSelfReview.IMMUNIZATIONS' | translate }}</h4>

      <div class="row">
        <div class="col-xs-12">
          <immunization-review-container
            patient="$ctrl.clientInfo"
            immunizations="$ctrl.immunizations">
          </immunization-review-container>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <edit-button
            button-id="review-edit-immunizations-button"
            button-text="{{'anonSelfReview.EDIT' | translate}} {{'anonSelfReview.IMMUNIZATIONS_TITLE' | translate}}"
            go-to-route="^.immunizations">
          </edit-button>
        </div>
      </div>
      <hr/>

      <h4>{{ 'anonSelfReview.DOCUMENT_PLACEHOLDER' | translate }}</h4>
      <div class="row">
        <document-upload-display is-editable="false"></document-upload-display>
      </div>
      <div class="row">
        <div class="col-xs-12">
           <edit-button
            button-id="review-edit-documents-button"
            button-text="{{'anonSelfReview.EDIT' | translate}} {{'anonSelfReview.DOCUMENTS_TITLE' | translate}}"
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
