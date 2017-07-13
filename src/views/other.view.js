/* @ngInject */
function other$ctrl () {}

export default {
  name: 'other',
  view: {
    bindings: { data: '@' },
    controller: other$ctrl,
    template: `
      <main ui-view></main>
    `
  }
}
