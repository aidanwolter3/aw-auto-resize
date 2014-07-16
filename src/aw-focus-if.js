/*   Module:
*      awFocusIf
*
*    Author:
*      Aidan Wolter
*
*    Description:
*      A directive which focuses the element depending on the conditional.
*
*    Dependencies:
*      JQuery
*/

angular.module('awFocusIf', [])
.directive('awFocusIf', function($timeout) {
  return {

    //restrict the directive to DOM attributes only
    restrict: 'A',

    //define a local scope
    scope: {
      trigger: '=awFocusIf'
    },

    //link into the DOM for modification
    link: function(scope, element) {

      //watch the trigger for updates
      scope.$watch('trigger', function(value) {

        //if should focus
        if(value === true) {
          $timeout(function() {
            element[0].focus();
          });
        }

        //else blur
        else {
          $timeout(function() {
            element[0].blur();
          });
        }
      });
    }
  };
});
