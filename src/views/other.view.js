otherController.$inject = [];
function otherController () {}

module.exports = {
  bindings: { data: '@' },
  controller: otherController,
  template: `
    <main ui-view></main>
  `
};
