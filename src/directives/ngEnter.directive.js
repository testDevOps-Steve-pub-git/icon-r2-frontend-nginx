/**
 * Created on 2017-02-13.
 * Directive for the enter keypress on the uib bootstrap
 * From (With some modifications): http://stackoverflow.com/questions/21633422/angularjs-accept-a-ui-bootstrap-modal-with-enter-key?rq=1
 */
(function() {
'use strict';

angular
  .module('icon.directives')
  .directive('ngEnter', ngEnter);

  ngEnter.$inject = [];
  function ngEnter() {
    return function (scope, element, attrs) {
        element.on("keydown keypress", function (event) {
          if (event.which === 13) {
            event.preventDefault();
            event.target.click();
          }
        });
    };
  }
})();
