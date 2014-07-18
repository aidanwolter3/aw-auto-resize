angular.module('AutoResize', ['awAutoResize', 'awCmdBar', 'awFocusIf'])
.controller('ResizeCtrl', function($scope, $timeout) {
  $scope.h1Text = 'This is a header which adjusts its font-size';
  $scope.h3Text = 'Another example except this has a min-size and max-size.';
  $scope.textareaText = 'This is a textarea which also adjusts its font-size.\nResize the window to trigger the resize.';

  $scope.h3Min = '30';
  $scope.h3Max = '40';
})

.controller('CmdBarCtrl', function($scope) {
	$scope.focusCmdBar = false;
	$scope.cmdBarContent = '';
  $scope.cmdBarPlaceholder = 'enter a command...';

	//build the commandTable for the command bar
  $scope.commandTable = {

		//example of a regular command
    'run': runComm = function() {
      console.log('running command...');
    },

		//regex command
    'go(ing)?': goComm = function() {
      console.log('going!');
    },

		//command with arguments
	  'print': argsComm = function(comm) {
			if(comm[1]) {
				console.log('You want me to print \''+comm[1]+'\'!');
			}
		}
  }
})

.controller('FocusIfCtrl', function($scope) {

});
