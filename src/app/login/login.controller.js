(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($log, $location, vmsClient, authPrinciple, $state, $rootScope) {
        var vm = this;

        vm.login = function() {
            $log.debug("=== $rootScope ===");
            $log.debug($rootScope.toState);
            $log.debug($rootScope.toStateParams);
            $log.debug("======");
            
            vmsClient.login(vm.credentials, function(response) {
                $log.debug('login success');
                $log.debug(response);

                var token = response.auth_access_token;

                $log.debug('token = ' + token);
                
                authPrinciple.authenticate(token);

                if (angular.isDefined($rootScope.toState)) {
                    if($rootScope.toState.name == 'login') {
                        $state.go('profile');
                    } else {
                        $log.debug("=== redirect ===");
                        // redirect page
                        $state.go($rootScope.toState.name);
                    }
                }
            }, function(response) {
                $log.debug('login error');
                $log.debug(response);
            });
        }
    }
})();