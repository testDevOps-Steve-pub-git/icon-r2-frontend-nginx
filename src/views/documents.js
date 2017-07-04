documentsController.$inject = [];
function documentsController () {}

module.exports = {
  bindings: { data: '<' },
  controller: documentsController,
    template: `
      <form class="form form-container icon-bg-white" name="documentForm" novalidate autocomplete="off">
        <document-upload-capture></document-upload-capture>
      </form>

      <hr />

      <next-prev-buttons></next-prev-buttons>
  `
};
