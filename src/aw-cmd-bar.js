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
      'focusOn': '=?',
      'inputContent': '=?'
    },

    //create the html template
    template: "<form ng-submit='submitCommand()'><input type='text' class='clear-input' ng-model='inputContent' aw-focus-if='focusOn' ng-focus='didFocusCommandBar()' ng-blur='didBlurCommandBar()' ng-attr-placeholder='{{commandBarPlaceholder}}'></input></form>",

    //link into the DOM for modification
    link: function(scope, element, attrs) {

      //set the defaults
      scope.commandBarPlaceholder = scope.defaultPlaceholder;
      scope.focusOn = false;

      //user submitted a command
      scope.submitCommand = function() {

        //verify that commandTable was set
        if(!scope.commandTable) {
          console.log('Commands are not set for aw-cmd-bar!');
          return;
        }

        //get the first part of the command
        var comm = scope.inputContent;
        comm = comm.split(' ');
        var first = comm[0];

        var onEnter = null;
        for(var commIndex in scope.commandTable) {
          var command = scope.commandTable[commIndex];
          
          //not a regex match
          if(!command.regex) {
            if(first == command.match) {
              onEnter = command.onEnter;
              break;
            }

          //regex match
          } else {
            var patt = new RegExp(command.match);
            if(patt.test(first)) {
              onEnter = command.onEnter;
              break;
            }
          }
        }

        //run the command if it exists
        if(onEnter)
          onEnter(comm);

        //clear the input contents
        scope.inputContent = '';
        scope.focusOn = false;
      }

      //focus and blur on command bar events
      scope.didFocusCommandBar = function() {
        scope.focusOn = true;
      }
      scope.didBlurCommandBar = function() {
        scope.focusOn = false;
        scope.inputContent = '';
      }

      //watch the inputContent to trigger onChange commands
      scope.$watch('inputContent', function() {

        if(scope.inputContent == null) {
          return;
        }

        //get the first part of the command
        var comm = scope.inputContent;
        comm = comm.split(' ');
        var first = comm[0];

        var onChange = null;
        for(var commIndex in scope.commandTable) {
          var command = scope.commandTable[commIndex];
          
          //is a regex match
          if(command.regex) {
            var patt = new RegExp(command.match);
            if(patt.test(first)) {
              onChange = command.onChange;
              break;
            }
          }
        }

        //run the command if it exists
        if(onChange)
          onChange(comm);
      });

      //watch the focus on trigger to update the command bar status
      scope.$watch('focusOn', function() {
        if(scope.focusOn) {
          scope.focusOn = true;
          scope.commandBarPlaceholder = '';
        } else {
          scope.focusOn = false;
          scope.commandBarPlaceholder = scope.defaultPlaceholder;
        }
      });

      //watch the defaultPlaceholder
      scope.$watch('defaultPlaceholder', function() {
        scope.commandBarPlaceholder = scope.defaultPlaceholder;
      });
    }
  }
});
