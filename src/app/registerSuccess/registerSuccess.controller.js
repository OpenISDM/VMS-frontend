(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('RegisterSuccessController', RegisterSuccessController);

    /** @ngInject */
    function RegisterSuccessController($log, $location) {
        var vm = this;
        vm.volunteer = $location.search();
    }
})();