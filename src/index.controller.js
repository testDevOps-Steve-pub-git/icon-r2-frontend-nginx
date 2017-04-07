(function () {
'use strict';

    angular
        .module('app', [])
        .controller('indexController', indexController);

    indexController.$inject=['$scope', '$transitions', '$window', 'BrowserChecker', 'ToasterChoiceService', '$translate', '$timeout'];
    function indexController($scope, $transitions, $window, BrowserChecker, ToasterChoiceService, $translate, $timeout) {

      //Variable to keep track of what toaster should be displayed
      $scope.toasterChoice = ToasterChoiceService.getToasterChoice();
      $scope.isBrowserSupported = BrowserChecker.isBrowserSupported(); 

      //For observer callback to watch toasterChoice
      let updateToasterChoice = function(){
        $scope.toasterChoice = ToasterChoiceService.getToasterChoice();
      };
      ToasterChoiceService.registerObserverCallback(updateToasterChoice);

      //Scrolls to nearest input element      
      $scope.scrollToContent = scrollToContent;

      $transitions.onSuccess({}, function() {
        //timeout to delay click until next digest cycle
        $timeout(function(){
          document.getElementById("content-skip").click();
        },100);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });

      /**** Browser back Warnings *****/
      /*Any going back to welcome page*/
      $transitions.onStart({to: 'welcome',
                            from: [ 'anon.self.**',
                                    'anon.other.**',
                                    'auth.self.**',
                                    'auth.other.**']},
                          (transition)=> {
                            switch(transition.from().name) {
                              case 'anon.self.submission.confirmation':
                                return true;
                                break;
                              case 'anon.other.submission.confirmation':
                                return true;
                                break;
                              case 'auth.self.submission.confirmation':
                                return true;
                                break;
                              case 'auth.other.submission.confirmation':
                                return true;
                                break;
                              case 'auth.self.patient':
                                return true;
                                break;
                              case 'auth.other.patient':
                                return true;
                                break;
                              default:
                                return confirm($translate.instant('leave_page.LEAVE_PAGE_CONFIRMATION'));
                                break;
                            }
                          });

      /* Anon submissions, display warning */
      $transitions.onBefore({from : [ 'anon.self.submission.patient',
                                      'anon.other.submission.patient',
                                    ],
                            to: 'anon'},
                            (transition) => {
                                return transition.router.stateService.target('welcome');
                            });


      /* Auth Login, user presses back to go to login screen again */
      $transitions.onBefore({from: ['auth.self.patient', 'auth.other.patient'],
                            to: ['auth.self.login', 'auth.other.login']},
                            (transition)=>{
                                return transition.router.stateService.target('welcome');
                            });

      /* Confirmation Screen, when user presses back take them to welcome screen */
      $transitions.onBefore({to:  [ 'anon.self.submission.review',
                                    'anon.other.submission.review',
                                    'auth.self.submission.review',
                                    'auth.other.submission.review'],
                            from: [ 'anon.self.submission.confirmation',
                                    'anon.other.submission.confirmation',
                                    'auth.self.submission.confirmation',
                                    'auth.other.submission.confirmation']},
                            (transition)=> {
                              return transition.router.stateService.target('welcome');
                            });


      /**
       * Finds the first interactive element on the page and puts the tab focus on that element. 
       * @memberof indexController 
       * @param {String} event: The click even containing the "Scroll to main content" element
       */
      function scrollToContent (event) {
        // A list of interactive elements
        let tags = ['input','button', 'a'];

        // The first of all elements of the selected tags 
        let selectableObjects = Object.values(tags) 
                                      .map((a) => getObjectPositions(a))
                                      .filter((a) => a != undefined);

        // The first of all interactive elements
        let selectedObject = selectableObjects[getMinimumDistanceObjectKey(selectableObjects)];

        // Focus on the first element
        selectedObject.element.focus();


        function getMinimumDistanceObjectKey(elements) {
          return Object.keys(elements)
                       .filter((a) => elements[a].distance === Math.min.apply(Math, (elements.map((a) => a.distance))));
        }

      /**
       * This function iterates through input objects and calculates if they are the first object of their type on the page.
       * @memberof scrollToContent 
       * @param {String} tag: element tag 
       * @returns element, element - The an object containing the selected element and the distance that element is from the scrollToContent element
       */
        function getObjectPositions (tag) {
          let element = Object.keys(document.getElementsByTagName(tag))
                              .map((a) => {return {element: document.getElementsByTagName(tag)[a], distance: document.getElementsByTagName(tag)[a].getBoundingClientRect().top - event.currentTarget.getBoundingClientRect().top}})
                              .filter((element) => element.distance > 0 && !element.element.classList.contains("skip"));

          return element[0];
        }
    }     
  } 
})();
