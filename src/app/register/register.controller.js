(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($log) {
        var vm = this;
        $log.log('RegisterController');

        vm.register = function() {
            $log.log('register');
            $log.log(vm.volunteer);
            //client = vmsClient.register(vm.volunteer);

        };
    }
})();