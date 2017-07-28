/* @ngInject */
function self$ctrl () {}

export default {
  name: 'self',
  view: {
    bindings: { data: '@' },
    controller: self$ctrl,
    template: `
      <ui-view></ui-view>
    `
  }
}
