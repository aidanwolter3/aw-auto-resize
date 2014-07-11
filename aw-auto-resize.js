/*   Module:
*       awAutoResize
*
*    Author:
*       Aidan Wolter
*
*    Description:
*       A directive which automatically resizes the font size of the elements
*       content to fit within the padding of the element. The directive binds
*       to the window resize.
*/

angular.module('awAutoResize', [])
.directive('awAutoResize', ['$window', function($window) {
  return {

    //restrict the directive to DOM attributes only
    restrict: 'A',

    //link into the DOM for modification
    link: function(scope, element, attrs) {

      //default font size
      scope.fontSize = '1em';

      //create a function to call on the window resize
      scope.onResize = function() {

        //determine the correct font size
        scope.fontSize = element.height()

        //set the font size of the element
        element.css('font-size', scope.fontSize);
      }

      //bind the windows resize to the function we just created
      angular.element($window).bind('resize', function() { scope.onResize(); });
    }
    
  };
}]);
