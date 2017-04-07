(function() {
    'use strict';
    angular.module('icon.directives')
        .directive('focus', focus);

        focus.$inject = ['$timeout'];
        function focus ($timeout) {
            return {
                restrict: "A",
                link : function(scope, element, attrs) {
                    var focus = scope.$eval(attrs.focus);
                    if (focus === "true" || focus === true) {
                        $timeout(function() {
                            element[0].focus();
                        }, 100);
                    }
                }
            };
        }
})();
