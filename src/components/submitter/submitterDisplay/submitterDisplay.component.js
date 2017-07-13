/**
 * Created on 2017-01-27.
 * Component to display submitter information
 */
/* @ngInject */
function submitterDisplay$ctrl () {}

export default {
  name: 'submitterDisplay',
  component: {
    templateUrl: './components/submitter/submitterDisplay/submitterDisplay.template.html',
    bindings: {
      submitterInfo: '<'
    },
    controller: submitterDisplay$ctrl
  }
}
