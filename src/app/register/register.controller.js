(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($log, $location, fieldName, vmsClient, vmsErrorMessage) {
        var vm = this;
        $log.log('RegisterController');

        vm.register = function() {
            $log.log('register');
            $log.log(vm.volunteer);
            vmsClient.register(vm.volunteer, function(response) {
                $log.log('success');
                $log.log(response);
                $location.path('/register-success?last_name=' + vm.volunteer.last_name + '&email=' + vm.volunteer.email, false);
            }, function(response) {
                $log.error('error');
                $log.error(response);

                if (response.status == 422) {
                    $log.error(response.data);

                    var errors = response.data.errors;
                    vm.errorMsg = vmsErrorMessage.getErrorMsg(errors);
                }
            });

        };
    }
})();