angular.module('AutoResize', ['awAutoResize'])
.controller('ResizeCtrl', function($scope) {
  $scope.h1Text = 'This is a header which adjusts its font-size';
  $scope.h3Text = 'Another example except this has a min-size=30 and max-size=70.';
  $scope.textareaText = 'This is a textarea which also adjusts its font-size.\nResize the window to trigger the resize.';
});
