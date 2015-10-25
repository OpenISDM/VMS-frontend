(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($log, $location, vmsClient, authPrinciple, $state) {
        var vm = this;

        vm.login = function() {
            vmsClient.login(vm.credentials, function(response) {
                $log.debug('login success');
                $log.debug(response);

                var token = response.auth_access_token;

                $log.debug('token = ' + token);
                
                authPrinciple.authenticate(token);

                $state.go('profile');
            }, function(response) {
                $log.debug('login error');
                $log.debug(response);
            });
        }
    }
})();