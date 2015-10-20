(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('RegisterSuccessController', RegisterSuccessController);

    /** @ngInject */
    function RegisterSuccessController($log, $location) {
        var vm = this;
        $log.log('RegisterSuccessController');
        vm.volunteer = $location.search();
        $log.log(vm.volunteer);
    }
})();