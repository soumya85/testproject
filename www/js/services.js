angular.module('starter.services', [])
// http://192.168.1.101/NewtownClub2/
// http://www.noboundstech.com/businessclub/api/
.factory('API', function ($rootScope, $http) {
	var base_url = 'http://www.noboundstech.com/businessclub/api/';
	
	return {
		common_api_post : function (form, url) {
			return $http.post(base_url+url, form, {
														method 	: 'POST',
				  										headers	: {'Content-Type':'application/json'}
													}
							);
		},
		common_api_get : function (form, url) {
			return $http.get(base_url+url, form, {
														method 	: 'POST',  
														cache 	: true,
														headers	: {'Content-Type': 'application/json'}
													}
							);
		},
		checkLogin : function()
		{
			var isLogin  = localStorage.getItem('user_id');
			
			if(typeof isLogin !='undefined' && isLogin != '' && isLogin != null)
			{
				return true;
			}
			else{
				return false;
			}
		}
	}
})