
angular.module('inaroundModule', [])
.controller('inaroundControler', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,API,$compile,$ionicLoading) {
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
	
	/*
	// Call API to get events for the month
	$scope.register = {};
	$scope.data = {};
	$scope.register_fun = function() {
		
		
		API.common_api_post($scope.register, 'register').success(function(response) {
			$scope.data.message = response.msg;
		})
	}
	*/
	google.maps.event.addDomListener(window, 'load', initialize());

    function initialize() {
      console.log("Initialize");
      var mapOptions = {
        // the Teide ;-)
        center: {lat: 28.271834, lng: -16.642405},
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
          mapTypeIds: []
        },
        panControl: false,
        streetViewControl: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      $scope.map = map;
    }
	  
});
