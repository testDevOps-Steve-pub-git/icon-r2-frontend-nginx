/* @ngInject */
function authOtherReview$ctrl ($state, ImmunizationRecordService) {
    this.progressBar = $state.$current.data.progressBar;

  this.$onInit = () => {
    this.clientInfo = ImmunizationRecordService.getPatient();
    this.submitterInfo = ImmunizationRecordService.getSubmitter();
    this.addressInfo = ImmunizationRecordService.getAddress();
    this.immunizations = ImmunizationRecordService.getNewImmunizations();
  }
}

export default {
  name: 'authOtherReview',
  view: {
    bindings: { data: '<' },
    controller: authOtherReview$ctrl,
    template: `
     <h1>{{ 'authOtherReview.REVIEW' | translate}}</h1>
     <h3>{{ 'authOtherReview.REVIEW_INSTRUCTION_HEADER' | translate }}</h3>
     <p>{{ 'authOtherReview.REVIEW_INSTRUCTION_BODY' | translate }} </p>
      <form id="reviewForm" name="reviewForm" novalidate>
        <hr />
        <h4>{{ 'authOtherReview.IMMUNIZATIONS_TITLE' | translate }}</h4>

        <div class="row">
          <div class="col-xs-12">
            <immunization-review-container
              patient="$ctrl.clientInfo"
              immunizations="$ctrl.immunizations">
            </immunization-review-container>
            <p>{{ 'anonOtherReview.REVIEW_INSTRUCTION_CAVEAT' | translate }} </p>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <edit-button
              button-id="review-edit-immunizations-button"
              button-text="{{'authOtherReview.REVIEW_EDIT_IMMS' | translate}}"
              go-to-route="^.immunizations">
            </edit-button>
          </div>
        </div>
        <hr/>

        <h4>{{ 'authOtherReview.DOCUMENTS_TITLE' | translate }}</h4>
        <div class="row">
          <document-upload-display is-editable="false" doc-review="review"></document-upload-display>
        </div>
        <div class="row">
          <div class="col-xs-12">
             <edit-button
              button-id="review-edit-documents-button"
              button-text="{{'authOtherReview.REVIEW_EDIT_DOX' | translate}}"
              go-to-route="^.documents">
            </edit-button>
          </div>
        </div>
        <hr/>

       <patient-other-display
          client-info="$ctrl.clientInfo">
        </patient-other-display>
        <hr />

        <submitter-display
          submitter-info="$ctrl.submitterInfo">
        </submitter-display>
        <hr/>

        <submit-immunizations></submit-immunizations>
      </form>
    `
  }
}
