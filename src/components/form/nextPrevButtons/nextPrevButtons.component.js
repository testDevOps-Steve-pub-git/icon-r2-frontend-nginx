/**
 * Created on 2017-01-05.
 * Component for the next and previous buttons on each page
 * Bindings:
 *    record: Immunization Record Service
 *    form: Parent form passed in for validation purposes (User not allowed to go next until form is valid)
 *    localInfo: Array of objects containing information that will go in the models
*                Objects look like {model: currentModel, data: localData} - Where the model is the model you would like to update
 *               And the data is the actual information that will be set by the model (See switch case in update model method)
 *    state: Which page state user is on used for next previous buttons
 */

/* @ngInject */
function nextPrevButtons$ctrl ($state, EditReviewService, ImmunizationRecordService) {
  /**
   * On initialization of component
   */
  this.$onInit = () => {
    /** Button/Routing setup */
    let current = $state.$current.data.navStates
                      .filter((s) => {
                        return $state.includes($state.$current.data.baseState + s.sref)
                      })[0]

    this.previous = current.previous
    this.next = current.next

    /** Review Page setup (If the user clicks the edit button on the review page */
    this.fromReviewPage = EditReviewService.getFromReviewPage()
    this.isReviewPage = (current.sref === '.review')

    this.previousPage = () => {
      let previousSref = $state.$current.data.baseState + this.previous.sref
      // If no onPrevious() action was specified, go directly to previous.
      if (!this.onPrevious) $state.go(previousSref)
      // Only go to previous if the onPrevious() action returns true.
      if (this.onPrevious && this.onPrevious()) $state.go(previousSref)
    }

    this.nextPage = () => {
      let nextSref = (!this.fromReviewPage)
          ? $state.$current.data.baseState + this.next.sref
          : $state.$current.data.baseState + '.review'
      // If no onNext() action was specified, go directly to next.
      if (!this.onNext) $state.go(nextSref)
      // Only go to next if the onNext() action returns true.
      if (this.onNext && this.onNext()) $state.go(nextSref)
    }
  }
}

export default {
  name: 'nextPrevButtons',
  component: {
    bindings: {
      onPrevious: '&?',
      onNext: '&?'
    },
    templateUrl: './components/form/nextPrevButtons/nextPrevButtons.template.html',
    controller: nextPrevButtons$ctrl
  }
}
