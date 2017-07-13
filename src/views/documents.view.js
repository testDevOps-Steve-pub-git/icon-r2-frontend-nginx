/* @ngInject */
function documents$ctrl () {}

export default {
  name: 'documents',
  view: {
    bindings: { data: '<' },
    controller: documents$ctrl,
      template: `
        <form class="form form-container icon-bg-white" name="documentForm" novalidate autocomplete="off">
          <document-upload-capture></document-upload-capture>
        </form>

        <hr />

        <next-prev-buttons></next-prev-buttons>
    `
  }
}
