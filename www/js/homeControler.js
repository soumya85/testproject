
angular.module('homeModule', [])
.controller('homeControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,$compile,$localStorage) {
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
	
	
	
	// Call API to get places
	$scope.places = {};
	
	$scope.fetch_family= function() {
		$scope.fdata = {};
		$scope.places.user_id=localStorage.getItem('user_id');
		$scope.places.member_id=localStorage.getItem('member_id');
		console.log("family Request",$scope.places);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.places, 'in_around.php').success(function(response) {
			
			console.log("fetch family Responce-",response);
			
			$scope.fdata.status= response.status;
			if($scope.fdata.status==true){
				
				$scope.fdata.result=response.result;
			}
			else{
				//none
			}
			//console.log('Data',$scope.fdata.result);
			//console.log('DOB',$scope.dob);
		})
	}
	
});
