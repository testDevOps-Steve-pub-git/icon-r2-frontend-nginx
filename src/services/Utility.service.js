/* @ngInject */
function Utility ($document) {

  /**
   * Focuses the first invalid field of a given form, after triggering touched
   * on all inputs in the form.
   * @param {object} form - angular form object
   */
  function focusFirstInvalidField (form) {
    if (form.$error.required)
    {
      form.$error.required.forEach((field) => { field.$setTouched() })
    }

    const invalidFields = angular.element($document[0].querySelector('button.ng-invalid, input.ng-invalid'))
    const hasInvalidFields = invalidFields.length > 0

    if (hasInvalidFields) invalidFields[0].focus()
  }

  return {
    focusFirstInvalidField
   }
}

export default {
  name:     `Utility`,
  service: Utility
}
