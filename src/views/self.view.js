selfController.$inject = [];
function selfController () {}

module.exports = {
  bindings: { data: '@' },
  controller: selfController,
  template: `
    <main ui-view></main>
  `
};
