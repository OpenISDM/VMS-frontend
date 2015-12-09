(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('site', {
                abstract: true,
                resolve: {
                    authorize: ['authorization', '$log',
                        function(authorization, $log) {
                            $log.debug('== resolve, authorize ===');
                            return authorization.authorize();
                        }
                    ]
                }
            })
            .state('login', {
                parent: 'site',
                url: '/login',
                data: {
                    needAuth: false
                },
                views: {
                    'mainContent@': {
                        templateUrl: 'app/login/login.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('registerPrivacy', {
                url: '/register-privacy',
                data: {
                    needAuth: false
                },
                views: {
                    'mainContent@': {
                        templateUrl: 'app/registerPrivacy/registerPrivacy.html',
                        controller: 'RegisterPrivacyController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('register', {
                url: '/register',
                data: {
                    needAuth: false
                },
                views: {
                    'mainContent@': {
                        templateUrl: 'app/register/register.html',
                        controller: 'RegisterController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('registerSuccess', {
                parent: 'site',
                url: '/register/success?last_name&email', // NEED to add paramters
                params: {
                    last_name: {
                        value: "志工" // default value
                    },
                    email: {
                        value: "註冊" // default value
                    }
                },
                data: {
                    needAuth: false
                },
                views: {
                    'mainContent@': {
                        templateUrl: 'app/registerSuccess/registerSuccess.html',
                        controller: 'RegisterSuccessController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('profile', {
                parent: 'site',
                url: '/profile',
                data: {
                    needAuth: true
                },
                views: {
                    'mainContent@': {
                        templateUrl: 'app/volunteer-profile/volunteer-profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('emailVerification', {
                parent: 'site',
                url: '/email_verification?email&verification_token',
                params: {
                    email: {
                        value: ""
                    },
                    verification_token: {
                        value: ""
                    }
                },
                data: {
                    needAuth: true
                },
                views: {
                    'mainContent@': {
                        templateUrl: 'app/emailVerification/emailVerification.html',
                        controller: 'EmailVerificationController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('introduction', {
                parent: 'site',
                url: '/',
                data: {
                    needAuth: false
                },
                views: {
                    'introductionContent@': {
                        templateUrl: 'app/about/about.html',
                        controller: 'AboutController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('copyright', {
                parent: 'site',
                url: '/copyright',
                data: {
                    needAuth: false
                },
                views: {
                    'mainContent@': {
                        templateUrl: 'app/copyrightPage/copyright.html'
                    }
                }
            })
            .state('projects', {
                parent: 'site',
                url: '/projects',
                data: {
                    needAuth: true
                },
                views: {
                    'mainContent@': {
                        templateUrl: 'app/volunteerProject/projectDetails.html',
                        controller: 'projectController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }

})();
