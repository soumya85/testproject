
angular.module('LocalEventModule', [])
.controller('LocalEventControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,$localStorage,$sessionStorage,ionicToast,$rootScope,$location) {
	// Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
	// Call API to get events for the month
	$scope.login = {};
	$scope.data = {};
	$scope.login_fun = function() {
		
		
		API.common_api_post($scope.login, 'login.php').success(function(response) {
			//console.log($scope.login);
			$scope.data.status= response.status;
			if($scope.data.status==true){
				console.log(response);
				
				$state.go("app.home");
			    ionicToast.hide();
			}
			else{
				$scope.data.message= response.msg;
				ionicToast.show($scope.data.message, 'middle', true, 1500);
			}
			console.log($scope.data);
			
		})
	}
});
