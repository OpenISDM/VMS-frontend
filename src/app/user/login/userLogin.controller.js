(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('UserLoginController', UserLoginController);

  /** @ngInject */
  function UserLoginController($log, userAuthentication, $rootScope, $state) {
    var vm = this;
    vm.alert = [];

    vm.login = function() {

      $log.debug('=== vm.role ===');
      $log.debug(vm.role);

      var onSuccess = function() {
        $log.debug('login success');

        // if the next state is login, it will go to profile state
        if ($rootScope.toState.name == 'login') {
          $state.go('profile');
        } else {

          // go to next with parameters
          if (angular.isDefined($rootScope.toStateParams)) {
            $state.go($rootScope.toState.name, $rootScope.toStateParams);
          } else {
            $state.go($rootScope.toState.name);
          }
        }
      };
      var onFailure = function(alert) {
        $log.debug('login error');
        $log.debug(alert);

        vm.alert = [];
        vm.alert.push(alert);
      };

      userAuthentication
        .login(vm.credentials, vm.role)
        .then(onSuccess)
        .catch(onFailure);
    }
  }
})();
