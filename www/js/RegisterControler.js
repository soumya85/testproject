
angular.module('RegisterModule', [])
.controller('RegisterControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,$cordovaToast,$localStorage) {
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
	$scope.register = {};
	$scope.data = {};
	$scope.register_error = '';
	$scope.register_fun = function() {
		if(typeof $scope.register.member_id == undefined || $scope.register.member_id == '' || $scope.register.member_id == null) {
			$scope.register_error = 'Please Provide Member Id.';
			return false;
		}
		if(typeof $scope.register.fullname == undefined || $scope.register.fullname == '' || $scope.register.fullname == null) {
			$scope.register_error = 'Please Provide Your Name.';
			return false;
		}
		if(typeof $scope.register.username == undefined || $scope.register.username == '' || $scope.register.username == null) {
			$scope.register_error = 'Please Provide Your Username.';
			return false;
		}
		if(typeof $scope.register.password == undefined || $scope.register.password == '' || $scope.register.password == null) {
			$scope.register_error = 'Please Provide password.';
			return false;
		}
		if(typeof $scope.register.confirm_password == undefined || $scope.register.confirm_password == '' || $scope.register.confirm_password == null) {
			$scope.register_error = 'Please confirm the password.';
			return false;
		}
		if(typeof $scope.register.email == undefined || $scope.register.email == '' || $scope.register.email == null) {
			$scope.register_error = 'Please Provide Your Mail Id.';
			return false;
		}
		if(typeof $scope.register.phone == undefined || $scope.register.phone == '' || $scope.register.phone == null) {
			$scope.register_error = 'Please Provide Your Phone No.';
			return false;
		}
		
		console.log('register request',$scope.register);
		API.common_api_post($scope.register, 'register.php').success(function(response) {
			console.log('regis responce ',response);
			if(response.status==true){
				///console.log(response);
				localStorage.setItem('member_id', response.memberId);
				localStorage.setItem('user_id', response.user_id);
				localStorage.setItem('fullname', response.fullname);
				$cordovaToast.showShortCenter("Registration Sucessfully");
				$scope.register_error = '';
				$state.go("app.home");
			}
			else{
				$scope.data.message= response.msg;
				$cordovaToast.showShortCenter($scope.data.message);
			}
			//console.log($scope.data);
		})
	}
	
	
});
