(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, auth, vmsLocalStorage, $rootScope, $state) {
    var vm = this;
    vm.alert = [];

    vm.login = function() {

      $log.debug('=== vm.role ===');
      $log.debug(vm.role);

      var onSuccess = function() {
        $log.debug('login success');

        vmsLocalStorage.setRole(vm.role);

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
      var onFailure = function(response) {
        $log.debug('login error');

        if (response.status == 401) {
          vm.alert.push({
            type: 'danger',
            message: ['帳號或密碼錯誤']
          });
        } else {
          vm.alert.push({
            type: 'danger',
            message: ['帳號或密碼錯誤']
          });
        }

        $log.debug('vm.alter');
        $log.debug(vm.alter);
      };

      auth.authenticate(vm.credentials).then(onSuccess).catch(onFailure);
    }
  }
})();
