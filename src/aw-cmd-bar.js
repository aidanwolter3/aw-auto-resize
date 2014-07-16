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
      'commandTable': '=commands',
      'defaultPlaceholder': '=',
      'focusOn': '=',
      'cancelOn': '='
    },

    //create the html template
    template: "<form ng-submit='submitCommand()'><input type='text' class='clear-input' ng-model='commandInput' aw-focus-if='userFocusedCommandBar' ng-focus='didFocusCommandBar()' ng-blur='didBlurCommandBar()' ng-attr-placeholder='{{commandBarPlaceholder}}'></input></form>",

    //link into the DOM for modification
    link: function(scope, element, attrs) {

      //set the defaults
      scope.commandBarPlaceholder = scope.defaultPlaceholder;
      scope.commandInput          = '';
      scope.userFocusedCommandBar = false;

      //user submitted a command
      scope.submitCommand = function() {

        //get the first part of the command
        var comm = scope.commandInput
        comm = comm.split(' ');
        var first = comm[0];

        //remove the first from comm to leave the rest of the arguments
        comm = comm.slice(1, comm.length);

        //find the command in the table and run
        var command = scope.commandTable[first];
        if(command) {
          command(comm);

        //couldn't find the command
        } else {
          console.log('Invalid command!');
        }

        //clear the input contents
        scope.commandInput = '';
      }

      //focus and blur on command bar events
      scope.didFocusCommandBar = function() {
        scope.commandBarPlaceholder = '';
        scope.userFocusedCommandBar = true;
      }
      scope.didBlurCommandBar = function() {
        scope.commandBarPlaceholder = scope.defaultPlaceholder;
        scope.commandInput          = '';
        scope.userFocusedCommandBar = false;
      }

      //watch when to focus or cancel focus on the command bar
      scope.$watch('focusOn', function() {
        scope.userFocusedCommandBar = scope.focusOn;
      });
      scope.$watch('cancelOn', function() {
        if(scope.cancelOn) {
          scope.commandBarPlaceholder = scope.defaultPlaceholder;
          scope.commandInput          = '';
          scope.userFocusedCommandBar = false;
        }
      })
    }
  }
});
