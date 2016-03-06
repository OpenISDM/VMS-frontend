(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, $location, vmsClient, auth, $rootScope, localStorageService) {
    var vm = this;

    $rootScope.postAuth();

    vm.login = function() {
      vmsClient.login(vm.credentials, function(response) {
        $log.debug('login success');
        $log.debug(response);

        vm.loginErrorMsg = undefined;
        var token = response.data.auth_access_token;

        localStorageService.set('username', vm.credentials.username);
        auth.setAuthenticated(token);
      //$rootScope.postAuth();
      }, function(response) {
        $log.debug('login error');
        $log.debug(response);

        if (response.status === 401) {
          vm.loginErrorMsg = "帳號或密碼錯誤";
        }
      });
    }
  }
})();
