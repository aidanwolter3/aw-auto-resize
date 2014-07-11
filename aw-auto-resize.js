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

      //set options as specified in DOM
      scope.maxSize = scope.$eval(attrs.awAutoResizeMax);
      scope.minSize = scope.$eval(attrs.awAutoResizeMin);

      //validate the options
      if(scope.maxSize <= scope.minSize) {
        throw new Error('awAutoResize: maxSize can not be less than or equal to minSize ('+scope.maxSize+' <= '+scope.minSize+')');
        return;
      }

      //set initial font size
      if(scope.maxSize && scope.maxSize < element.height()) {
        scope.fontSize = scope.maxSize;
      } else if(scope.minSize && scope.minSize > element.height()) {
        scope.fontSize = scope.minSize;
      } else {
        scope.fontSize = element.height();
      }
      element.css('font-size', scope.fontSize);

      //create a function to call on the window resize
      scope.onResize = function() {

        //determine the correct font size
        if(scope.maxSize && scope.maxSize < element.height()) {
          scope.fontSize = scope.maxSize;
        } else if(scope.minSize && scope.minSize > element.height()) {
          scope.fontSize = scope.minSize;
        } else {
          scope.fontSize = element.height();
        }

        //set the font size of the element
        element.css('font-size', scope.fontSize);
      }

      //bind the windows resize to the function we just created
      angular.element($window).bind('resize', function() { scope.onResize(); });
    }

  };
}]);
