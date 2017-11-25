
angular.module('RulesModule', [])
.controller('RulesControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,ionicToast,$localStorage,API,$location) {
	
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
		
	// Call API to get rules
	$scope.rules = {};
	$scope.rules.member_id=localStorage.getItem('member_id');
	$scope.rules.user_id=localStorage.getItem('user_id');
	$scope.data = {};
	$scope.week_name = {0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat'};
	$scope.rules_fun = function() {
	$scope.rules.member_id=localStorage.getItem('member_id');
	$scope.rules.user_id=localStorage.getItem('user_id');
		$scope.data = {};
		console.log("rules Request",$scope.rules);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.rules, 'club_rule.php').success(function(response) {
			
			console.log("rules Responce-",response);
			
			$scope.data.status= response.status;
			if($scope.data.status==true){
				$scope.data.result=response.result;
				for(var i=0;i<$scope.data.result.length;i++){
					$scope.data.result[i].cl_rule_date=response.result[i].cl_rule_date;
					$scope.data.result[i].date = new Date($scope.data.result[i].cl_rule_date);
					$scope.data.result[i].day = $scope.data.result[i].date.getDay();
					$scope.data.result[i].weak = $scope.week_name[$scope.data.result[i].day]; 
					
					$scope.data.result[i].cl_rule_detail = response.result[i].cl_rule_detail;
					$scope.data.result[i].cl_rule_head = response.result[i].cl_rule_head;
					$scope.data.result[i].cl_rule_id = response.result[i].cl_rule_id;
					//console.log("News Result-",$scope.data.result.cl_rule_date);
				}
				//console.log("Date-",$scope.data.result);
				//$scope.event_id=response.result.event_id;
				//console.log("News event_id-",$scope.event_id);
	
			}
			else{
				$scope.data.message= response.msg;
				ionicToast.show($scope.data.message, 'middle', true, 1500);
			}
			//console.log($scope.data);
			
		})
	}
	

	
});