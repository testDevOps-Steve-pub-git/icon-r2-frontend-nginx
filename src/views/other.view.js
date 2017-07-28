/* @ngInject */
function other$ctrl () {}

export default {
  name: 'other',
  view: {
    bindings: { data: '@' },
    controller: other$ctrl,
    template: `
      <ui-view></ui-view>
    `
  }
}
