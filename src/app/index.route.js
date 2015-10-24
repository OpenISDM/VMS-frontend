(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('volunteer-profile', {
        url: '/volunteer-profile',
        templateUrl: 'app/volunteer-profile/volunteer-profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .state('register-privacy', {
        url: '/register-privacy',
        templateUrl: 'app/register-privacy/register-privacy.html',
        controller: 'RegisterPrivacyController',
        controllerAs: 'vm'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .state('register-success', {
        url: '/register/success?last_name&email',     // NEED to add paramters
        templateUrl: 'app/register-success/register-success.html',
        controller: 'RegisterSuccessController',
        controllerAs: 'vm',
        params: {
          last_name: {
            value: "志工"  // default value
          },
          email: {
            value: "註冊"   // default value
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
