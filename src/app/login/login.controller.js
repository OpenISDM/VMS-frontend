(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($log, $location, toastr, vmsClient, jwtLocalStorage) {
        var vm = this;

        vm.login = function() {
            vmsClient.login(vm.credentials, function(response) {
                $log.debug('login success');
                $log.debug(response);

                var token = response.auth_access_token;

                $log.debug('token = ' + token);

                jwtLocalStorage.set(token);

                toastr.success('login successfully', '登入成功', {
                    closeButton: true
                });
            }, function(response) {
                $log.debug('login error');
                $log.debug(response);

            });
        }
    }
})();