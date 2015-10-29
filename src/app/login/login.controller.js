(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($log, $location, vmsClient, authPrinciple, $state, $rootScope, localStorageService) {
        var vm = this;

        vm.login = function() {
            vmsClient.login(vm.credentials, function(response) {
                $log.debug('login success');
                $log.debug(response);

                vm.loginErrorMsg = undefined;
                var token = response.data.auth_access_token;

                $log.debug('token = ' + token);

                localStorageService.set('username', vm.credentials.username);
                authPrinciple.authenticate(token);

                if (angular.isDefined($rootScope.toState)) {
                    if ($rootScope.toState.name == 'login') {
                        if (angular.isDefined($rootScope.returnToState)) {
                            if ($rootScope.returnToState.name != 'login') {
                                $state.go($rootScope.returnToState.name, $rootScope.returnToStateParams);
                            }
                        }
                    } else {
                        $state.go($rootScope.toState.name, $rootScope.returnToStateParams);
                    }
                }

                $state.go('profile');
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