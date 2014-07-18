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
			'inputContent': '@'
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

        //check commandTable for exact matches
        var command = scope.commandTable[first];

				//if no exact matches are found
				if(!command) {
					
					//check if matches anything in commandTable as a regex
					for(key in scope.commandTable) {
						var patt = new RegExp(key);
						if(patt.test(first)) {
							command = scope.commandTable[key];
							break;
						}
					}
				}

        if(command) {
          command(comm);

        //couldn't find the command
        } else {
          console.log('Invalid command!');
        }

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

      //watch when to focus or cancel focus on the command bar
      scope.$watch('focusOn', function() {
        scope.focusOn = scope.focusOn;
      });
    }
  }
});
