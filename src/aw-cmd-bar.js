/*   Module:
*      awCmdBar
*
*    Author:
*      Aidan Wolter
*
*    Description:
*      A directive which creates a command bar form, allowing the user to
*      execute instructions on the page.
*
*    Dependencies:
*      aw-focus-if
*/

angular.module('awCmdBar', ['awFocusIf'])
.directive('awCmdBar', function() {
  return {

    //restrict the directive to DOM elements only
    restrict: 'E',

    transclude: true,

    //declare the scope as local
    scope: {
      'commandTable': '=commands'
    },

    //create the html template
    template: "<form ng-submit='submitCommand()'><input type='text' class='clear-input' ng-model='commandInput' focus-if='userFocusedCommandBar' ng-focus='didFocusCommandBar()' ng-blur='didBlurCommandBar()' ng-attr-placeholder='{{commandBarPlaceholder}}'></input></form>",

    //link into the DOM for modification
    link: function(scope, element, attrs) {
      console.log('loaded cmd bar');
      scope.commandBarPlaceholder = ':command      /search';
      scope.commandInput          = '';
      scope.userFocusedCommandBar = false;

      //user submitted a command
      scope.submitCommand = function() {
        var comm = scope.commandInput.slice(1, comm.length).split(' ');
        var first = comm.shift();
        var command = scope.commandTable[first];
        if(command) {
          command(comm);
        } else {
          console.log('Invalid command!');
        }
      }

      //focus and blur on command bar events
      scope.didFocusCommandBar = function() {
        scope.commandBarPlaceholder = '';
        scope.userFocusedCommandBar = true;
        console.log('focus');
      }
      scope.didBlurCommandBar = function() {
        scope.commandBarPlaceholder = ':command      /search';
        scope.commandInput          = '';
        scope.userFocusedCommandBar = false;
        console.log('blur');
      }
    }
  }
});
