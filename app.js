angular.module('AutoResize', ['awAutoResize', 'awCmdBar'])
.controller('ResizeCtrl', function($scope, $timeout) {
  $scope.h1Text = 'This is a header which adjusts its font-size';
  $scope.h3Text = 'Another example except this has a min-size and max-size.';
  $scope.textareaText = 'This is a textarea which also adjusts its font-size.\nResize the window to trigger the resize.';

  $scope.h3Min = '30';
  $scope.h3Max = '40';
})

.controller('CmdBarCtrl', function($scope) {

})

.controller('FocusIfCtrl', function($scope) {

});
