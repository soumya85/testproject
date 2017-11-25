
angular.module('MemberModule', [])
.controller('MemberControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,$cordovaToast,$localStorage,API,$location,$ionicLoading) {
	
	
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
	
	// Set Tab Index
	$scope.tabIndex = 1;
	$scope.changeTabIndex = function(index)
	{
		$scope.tabIndex = index;
	};
	
	if(!API.checkLogin())
	{
		//$location.url('/app/signin');
		$state.go("app.signin");
	}
	
	// Call API to get news
	$scope.news = {};
	$scope.news.member_id=localStorage.getItem('member_id');
	$scope.news.user_id=localStorage.getItem('user_id');
	$scope.data = {};
	$scope.week_name = {0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat'};
	$scope.news_fun = function() {
	$scope.news.member_id=localStorage.getItem('member_id');
	$scope.news.user_id=localStorage.getItem('user_id');
		$scope.data = {};
		console.log("News Request",$scope.news);
		$ionicLoading.show({template: '<ion-spinner icon="lines"></ion-spinner>',duration: 3000}); 
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.news, 'news.php').success(function(response) {
			
			console.log("News Responce-",response);
			$ionicLoading.hide();
				$scope.data.status= response.status;
				if($scope.data.status==true){
					$scope.data.result=response.result;
					for(var i=0;i<$scope.data.result.length;i++){
						$scope.data.result[i].news_date=response.result[i].news_date;
						$scope.data.result[i].date = new Date($scope.data.result[i].news_date);
						$scope.data.result[i].day = $scope.data.result[i].date.getDay();
						$scope.data.result[i].weak = $scope.week_name[$scope.data.result[i].day]; 
						
						$scope.data.result[i].news_desc = response.result[i].news_desc;
						$scope.data.result[i].news_head = response.result[i].news_head;
						$scope.data.result[i].news_id = response.result[i].news_id;
						$scope.data.result[i].reaction = response.result[i].reaction;
						$scope.data.result[i].totalDisLike = response.result[i].totalDisLike;
						$scope.data.result[i].totalLike = response.result[i].totalLike;
						//console.log("News Result-",$scope.data.result.news_date);
					}
					//console.log("Date-",$scope.data.result);
					//$scope.event_id=response.result.event_id;
					//console.log("News event_id-",$scope.event_id);
		
				}
				else{
					$scope.data.message= response.msg;
					$cordovaToast.showShortCenter($scope.data.message);
				}
			//console.log($scope.data);
			
		})
	}
	
	
	
	// Call API to get offer
	$scope.offer = {};
	$scope.offer.member_id=localStorage.getItem('member_id');
	$scope.offer.user_id=localStorage.getItem('user_id');
	$scope.data = {};
	$scope.week_name = {0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat'};
	$scope.offer_fun = function() {
	$scope.offer.member_id=localStorage.getItem('member_id');
	$scope.offer.user_id=localStorage.getItem('user_id');
		$scope.data = {};
		console.log("offer Request",$scope.offer);
		$ionicLoading.show({template: '<ion-spinner icon="lines"></ion-spinner>',duration: 3000}); 
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.offer, 'offer.php').success(function(response) {
			
			console.log("offer Responce-",response);
			$ionicLoading.hide();
				$scope.data.status= response.status;
				if($scope.data.status==true){
					$scope.data.result=response.result;
					for(var i=0;i<$scope.data.result.length;i++){
						$scope.data.result[i].offer_date=response.result[i].offer_date;
						$scope.data.result[i].date = new Date($scope.data.result[i].offer_date);
						$scope.data.result[i].day = $scope.data.result[i].date.getDay();
						$scope.data.result[i].weak = $scope.week_name[$scope.data.result[i].day]; 
						
						$scope.data.result[i].offer_desc = response.result[i].offer_desc;
						$scope.data.result[i].offer_head = response.result[i].offer_head;
						$scope.data.result[i].offer_id = response.result[i].offer_id;
						$scope.data.result[i].reaction = response.result[i].reaction;
						$scope.data.result[i].totalDisLike = response.result[i].totalDisLike;
						$scope.data.result[i].totalLike = response.result[i].totalLike;
						//console.log("offer Result-",$scope.data.result.news_date);
					}
					//console.log("Date-",$scope.data.result);
					//$scope.event_id=response.result.event_id;
					//console.log("offer event_id-",$scope.event_id);
		
				}
				else{
					$scope.data.message= response.msg;
					//$cordovaToast.showShortCenter($scope.data.message);
				}
			//console.log($scope.data);
			
		})
	}
	
	// Call API to like dislike in news
	$scope.likedislike = {};
	
	$scope.likedislike.subject_id=0;
	$scope.likedislike.subject_type="";
	$scope.likedislike.react_type="";
	
	$scope.output = {};
	$scope.likedislike_fun = function(id,LD,index,type) {
		$scope.likedislike.member_id=localStorage.getItem('member_id');
		$scope.likedislike.user_id=localStorage.getItem('user_id');
		$scope.likedislike.subject_id=id;
		$scope.likedislike.react_type=LD;
		$scope.likedislike.subject_type=type;
		console.log("likedislike Request",$scope.likedislike);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.likedislike, 'reaction.php').success(function(response) {
			
			console.log("likedislike Responce-",response);			
			$scope.output.status= response.status;
			if($scope.output.status==true){
				$scope.output.react_id=response.react_id;
				   // $scope.isDisabled = true;
				if($scope.likedislike.react_type=='L'){
					if($scope.data.result[index].reaction=='dislike'){
						$scope.data.result[index].totalDisLike=$scope.data.result[index].totalDisLike-1;
					}
					$scope.data.result[index].totalLike=$scope.data.result[index].totalLike+1;
					$scope.data.result[index].reaction = 'like';
				}	
				if($scope.likedislike.react_type=='D'){
					if($scope.data.result[index].reaction=='like'){
						$scope.data.result[index].totalLike=$scope.data.result[index].totalLike-1;
					}
					$scope.data.result[index].totalDisLike=$scope.data.result[index].totalDisLike+1;
					$scope.data.result[index].reaction = 'dislike';
				}	
			}
			else{
				//none
			}
			//console.log($scope.output);
			
		})
	}
	
	
	
	
	/*
	// Call API to get events
	$scope.events = {};
	$scope.events.member_id=$localStorage.member_id;
	$scope.events.user_id=$localStorage.user_id;
	//$scope.data1 = {};
	$scope.events_fun = function() {
		$scope.data = {};
		console.log(" Event Request",$scope.events);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.events, 'event.php').success(function(response) {
			
			console.log("Events Responce-",response);
			
			$scope.data.status= response.status;
			if($scope.data.status==true){
				$scope.data.result=response.result;
				$scope.participateState=response.result.allow_participate;
				
			}
			else{
				$scope.data.message= response.msg;
				ionicToast.show($scope.data1.message, 'middle', true, 1500);
			}
			//console.log($scope.data);
			
		})
	}
	*/
	// Call API to get events
	$scope.events = {};
	$scope.events.member_id=localStorage.getItem('member_id');
	$scope.events.user_id=localStorage.getItem('user_id');
	$scope.data = {};
	$scope.week_name = {0:'Sun', 1:'Mon', 2:'Tue', 3:'Wed', 4:'Thu', 5:'Fri', 6:'Sat'};
	$scope.events_fun = function() {
		$ionicLoading.show({template: '<ion-spinner icon="lines"></ion-spinner>',duration: 3000}); 
		$scope.events.member_id=localStorage.getItem('member_id');
	    $scope.events.user_id=localStorage.getItem('user_id');
		$scope.data = {};
		console.log("events Request",$scope.events);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.events, 'event.php').success(function(response) {
			
			console.log("events Responce-",response);
			$ionicLoading.hide();
			$scope.data.status= response.status;
			if($scope.data.status==true){
				$scope.data.result=response.result;
				for(var i=0;i<$scope.data.result.length;i++){
					$scope.data.result[i].event_date=response.result[i].event_date;
					$scope.data.result[i].date = new Date($scope.data.result[i].event_date);
					$scope.data.result[i].day = $scope.data.result[i].date.getDay();
					$scope.data.result[i].weak = $scope.week_name[$scope.data.result[i].day]; 
					
					$scope.data.result[i].event_desc = response.result[i].event_desc;
					$scope.data.result[i].event_head = response.result[i].event_head;
					$scope.data.result[i].event_id = response.result[i].event_id;
					$scope.data.result[i].reaction = response.result[i].reaction;
					$scope.data.result[i].totalDisLike = response.result[i].totalDisLike;
					$scope.data.result[i].totalLike = response.result[i].totalLike;
					$scope.data.result[i].allow_participate = response.result[i].allow_participate;
					$scope.data.result[i].user_participate = response.result[i].user_participate;
					//console.log("events Result-",$scope.data.result.events_date);
				}
				console.log("Date-",$scope.data.result);
				//$scope.event_id=response.result.event_id;
				//console.log("events event_id-",$scope.event_id);
	
			}
			else{
				$scope.data.message= response.msg;
				ionicToast.show($scope.data.message, 'middle', true, 1500);
			}
			//console.log($scope.data);
			
		})
	}
	 
	 //call participate API
	 $scope.participate = {};
	$scope.participate.member_id=localStorage.getItem('member_id');
	$scope.participate.user_id=localStorage.getItem('user_id');
	$scope.pdata = {};
	$scope.participate_fun = function(id) {
		$scope.participate.event_id=id;
		$scope.participate.member_id=localStorage.getItem('member_id');
		$scope.participate.user_id=localStorage.getItem('user_id');
		console.log(" participate Request",$scope.participate);
		//console.log("local member id---",$localStorage.member_id);
		API.common_api_post($scope.participate, 'participate.php').success(function(response) {
			
			console.log("participate Responce-",response);
			
			$scope.pdata.status= response.status;
			if($scope.pdata.status==true){
				$scope.pdata.part_id=response.part_id;
				$scope.pdata.message= response.msg;
				//ionicToast.show($scope.pdata.message, 'middle', true, 1500);
				 $cordovaToast.showShortCenter($scope.pdata.message);
			}
			else{
				$scope.pdata.message= response.msg;
				//ionicToast.show($scope.pdata.message, 'middle', true, 1500);
				$cordovaToast.showShortCenter($scope.pdata.message);
			}
			//console.log($scope.data);
			
		})
	}
	
	
	$scope.sugestion_page = function() {
		$state.go("app.suggestion");
	}
	$scope.rules_page = function() {
		$state.go("app.rules");
	}
	$scope.profile_page = function() {
		$state.go("app.profiledetails");
	}
});