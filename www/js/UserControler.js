
angular.module('UserModule', [])
.controller('UserControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,ionicToast,$localStorage) {
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
	
	
	$scope.Uuser = {};
	// Call API to get user details
	$scope.fuser = {};
	

	$scope.fetch_user = function() {
		$scope.data = {};
		$scope.fuser.user_id=localStorage.getItem('user_id');
		$scope.fuser.member_id=localStorage.getItem('member_id');
		console.log("User Request",$scope.fuser);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.fuser, 'myprofile.php').success(function(response) {
			
			console.log("fetch user Responce-",response);
			
			$scope.data.status= response.status;
			if($scope.data.status==true){
				
				$scope.data.result=response.profile;
				
				$scope.Uuser.dob=$scope.data.result.dob;
				$scope.Uuser.qualification=$scope.data.result.qualification;
				$scope.Uuser.profession=$scope.data.result.profession;
				$scope.Uuser.email=$scope.data.result.email;
				$scope.Uuser.address=$scope.data.result.address;
				$scope.Uuser.family_head=$scope.data.result.family_head;
				$scope.Uuser.fullname=$scope.data.result.fullname;
				$scope.Uuser.gender=$scope.data.result.gender;
				$scope.Uuser.member_id=$scope.data.result.member_id;
				$scope.Uuser.phone=$scope.data.result.phone;
				$scope.Uuser.user_id=$scope.data.result.user_id;
			}
			else{
				//none
			}
			console.log('Data',$scope.data);
			//console.log('DOB',$scope.dob);
		})
	}
	
	// Call API to get user details

	
	$scope.update_user = function() {
		$scope.data = {};
		$scope.Uuser.user_id=localStorage.getItem('user_id');
		$scope.Uuser.member_id=localStorage.getItem('member_id');
		console.log("User Request",$scope.Uuser);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.Uuser, 'my_profile_update.php').success(function(response) {
			
			console.log("fetch user Responce-",response);
			
			$scope.data.status= response.status;
			if($scope.data.status==true){
				
				$scope.data.msg=response.msg;
				//$cordovaToast.showShortCenter($scope.data.message);
				console.log($scope.data.message);
			}
			else{
				$scope.data.msg=response.msg;
				//$cordovaToast.showShortCenter($scope.data.message);
				console.log($scope.data.message);
			}
			console.log('Data',$scope.data);
			//console.log('DOB',$scope.dob);
		})
	}
	
	// Call API to update password
	$scope.pwdchange = {};
	$scope.pwdchange_error = '';
	$scope.pwdchange_fun = function() {
		$scope.data = {};
		$scope.pwdchange.user_id=localStorage.getItem('user_id');
		$scope.pwdchange.member_id=localStorage.getItem('member_id');
		
		console.log("update pwd request",$scope.pwdchange);
		
		if(typeof $scope.pwdchange.old_password == undefined || $scope.pwdchange.old_password == '' || $scope.pwdchange.old_password == null) {
			$scope.pwdchange_error = 'Please Provide Old Password.';
			return false;
		}
		if(typeof $scope.pwdchange.new_password == undefined || $scope.pwdchange.new_password == '' || $scope.pwdchange.new_password == null) {
			$scope.pwdchange_error = 'Please Provide New Password.';
			return false;
		}
		if(typeof $scope.pwdchange.confirm_new_password == undefined || $scope.pwdchange.confirm_new_password == '' || $scope.pwdchange.confirm_new_password == null) {
			$scope.pwdchange_error = 'Please Retype New Password.';
			return false;
		}
		
		API.common_api_post($scope.pwdchange, 'password_change.php').success(function(response) {
			
			console.log("pwdchange Responce-",response);
			
			$scope.data.status= response.status;
			if($scope.data.status==true){
				$scope.data.message= response.msg;
				$cordovaToast.showShortCenter($scope.data.message);
				$scope.pwdchange_error = '';
				$scope.pwdchange = {};
			}
			else{
				$scope.data.message= response.msg;
				$cordovaToast.showShortCenter($scope.data.message);
			}
			//console.log($scope.data);
			
		})
	}
	
	// Call API to get family detalis
	$scope.family_details = {};
	
	$scope.fetch_family= function() {
		$scope.fdata = {};
		$scope.family_details.user_id=localStorage.getItem('user_id');
		$scope.family_details.member_id=localStorage.getItem('member_id');
		console.log("family Request",$scope.family_details);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.family_details, 'family_details.php').success(function(response) {
			
			console.log("fetch family Responce-",response);
			
			$scope.fdata.status= response.status;
			if($scope.fdata.status==true){
				
				$scope.fdata.result=response.family;
			}
			else{
				//none
			}
			console.log('Data',$scope.fdata.result);
			//console.log('DOB',$scope.dob);
		})
	}
	
	// Call API to get membership details 
	$scope.membership_details = {};
	
	$scope.fetch_membership= function() {
		$scope.mdata = {};
		$scope.membership_details.user_id=localStorage.getItem('user_id');
		$scope.membership_details.member_id=localStorage.getItem('member_id');
		console.log("family Request",$scope.membership_details);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.membership_details, 'membership_details.php').success(function(response) {
			
			console.log("fetch family Responce-",response);
			
			$scope.mdata.status= response.status;
			if($scope.mdata.status==true){
				
				$scope.mdata.result=response.details;
				$scope.membershipid=$scope.mdata.result.member_id;
				$scope.member_since=$scope.mdata.result.member_since;
				$scope.member_type=$scope.mdata.result.member_type;
				$scope.renewal_date=$scope.mdata.result.renewal_date;
			}
			else{
				//none
			}
			console.log('Data',$scope.mdata.result);
			//console.log('DOB',$scope.dob);
		})
	}
	
	// Call API to get membership details 
	$scope.bill_details = {};
	
	$scope.fetch_bill= function() {
		$scope.bdata = {};
		$scope.bill_details.user_id=localStorage.getItem('user_id');
		$scope.bill_details.member_id=localStorage.getItem('member_id');
		console.log("bill Request",$scope.bill_details);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.bill_details, 'bill_view.php').success(function(response) {
			
			console.log("fetch bill Responce-",response);
			
			$scope.bdata.status= response.status;
			if($scope.bdata.status==true){
				
				$scope.bdata.result=response.result;
			}
			else{
				$scope.bdata.message= response.msg;
			}
			console.log('Data',$scope.bdata.result);
			//console.log('DOB',$scope.dob);
		})
	}

	
});
