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
        controllerAs: 'login'
      })
      .state('register-privacy', {
        url: '/register-privacy',
        templateUrl: 'app/register-privacy/register-privacy.html',
        controller: 'RegisterPrivacyController',
        controllerAs: 'registerPrivacy'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
