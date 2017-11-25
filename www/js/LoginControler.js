
angular.module('LoginModule', [])
.controller('LoginControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,$localStorage,$sessionStorage,$cordovaToast,$rootScope,$location) {
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
	$scope.login_error = '';
	$scope.login_fun = function() {
		
		if(typeof $scope.login.username == undefined || $scope.login.username == '' || $scope.login.username == null) {
			$scope.login_error = 'Please Provide Username.';
			return false;
		}
		if(typeof $scope.login.password == undefined || $scope.login.password == '' || $scope.login.password == null) {
			$scope.login_error = 'Please Provide Password.';
			return false;
		}
		
		API.common_api_post($scope.login, 'login.php').success(function(response) {
			console.log("login request",$scope.login);
			$scope.data.status= response.status;
			if($scope.data.status==true){
				console.log("login responce",response);
				localStorage.setItem('member_id', response.memberId);
				localStorage.setItem('user_id', response.userId);
				//localStorage.setItem('user_name', response.username);
				localStorage.setItem('fullname', response.fullname);
				$scope.login_error = '';
				//localStorage.setItem('loginState', true);
				$state.go("app.member");
			}
			else{
				$scope.data.message= response.msg;
				$cordovaToast.showShortCenter($scope.data.message);
			}
			console.log($scope.data);
			
		})
	}
});
