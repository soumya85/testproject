
angular.module('SugestionModule', [])
.controller('SugestionControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,$cordovaToast,$localStorage,API,$location) {
	
	if(!API.checkLogin())
	{
		//$location.url('/app/signin');
		$state.go("app.signin");
	}
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
	
	// Call API to get events
	$scope.sugestion = {};
	$scope.sugestion_error = '';
	$scope.sugestion_fun = function() {
		$scope.data = {};
		$scope.sugestion.user_id=localStorage.getItem('user_id');
		//console.log(" Suggestion Request",$scope.sugestion);
		//console.log("local member id---",$localStorage.member_id);
		
		if(typeof $scope.sugestion.suggestion_head == undefined || $scope.sugestion.suggestion_head == '' || $scope.sugestion.suggestion_head == null) {
			$scope.sugestion_error = 'Please Provide Subject.';
			return false;
		}
		if(typeof $scope.sugestion.suggestion == undefined || $scope.sugestion.suggestion == '' || $scope.sugestion.suggestion == null) {
			$scope.sugestion_error = 'Please Provide Suggestion.';
			return false;
		}
		
		API.common_api_post($scope.sugestion, 'suggestion.php').success(function(response) {
			
			console.log("sugestion Responce-",response);
			
			$scope.data.status= response.status;
			if($scope.data.status==true){
				$scope.data.result=response.result;
				$scope.data.message= response.msg;
				$cordovaToast.showShortCenter($scope.data.message);
				$scope.sugestion_error = '';
				$scope.sugestion = {};
			}
			else{
				$scope.data.message= response.msg;
				$cordovaToast.showShortCenter($scope.data.message);
			}
			//console.log($scope.data);
			
		})
	}
	
});