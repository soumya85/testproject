// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput','LoginModule','starter.services','RegisterModule',
							'inaroundModule','MemberModule','ngStorage','ionic-toast','homeModule','LocalEventModule','SugestionModule','RulesModule','UserModule','ngCordova' ])

.run(function($ionicPlatform,$rootScope,API) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		$rootScope.loginState = API.checkLogin();
		$rootScope.username = localStorage.getItem('fullname');
	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
	
	.state('app.signin', {
        url: '/signin',
        views: {
            'menuContent': {
                templateUrl: 'templates/signin.html',
                controller: 'LoginControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	.state('app.regis', {
        url: '/regis',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'RegisterControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.member', {
        url: '/member',
        views: {
            'menuContent': {
                templateUrl: 'templates/memberzone.html',
                controller: 'MemberControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.inaround', {
        url: '/inaround',
        views: {
            'menuContent': {
                templateUrl: 'templates/inaround.html',
                controller: 'inaroundControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'homeControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.localevent', {
        url: '/localevent',
        views: {
            'menuContent': {
                templateUrl: 'templates/local_event.html',
                controller: 'LocalEventControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.suggestion', {
        url: '/suggestion',
        views: {
            'menuContent': {
                templateUrl: 'templates/sugestion.html',
                controller: 'SugestionControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.rules', {
        url: '/rules',
        views: {
            'menuContent': {
                templateUrl: 'templates/rules.html',
                controller: 'RulesControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.userprofile', {
        url: '/userprofile',
        views: {
            'menuContent': {
                templateUrl: 'templates/user_profile.html',
                controller: 'UserControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.profiledetails', {
        url: '/profiledetails',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile_details.html',
                controller: 'UserControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
	.state('app.more', {
        url: '/more',
        views: {
            'menuContent': {
                templateUrl: 'templates/more.html',
                controller: 'MemberControler'
            },
            'fabContent': {
                template: ''
            }
        }
    })
	
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    
	
	
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
