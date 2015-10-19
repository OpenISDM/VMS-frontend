(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .factory('vmsClient', vmsClient);

    /** @ngInject */
    function vmsClient($log, Restangular) {
        var service = {
            register: register
        };

        return service;

        function register(volunteer) {
            return Restangular.all('register').post(volunteer);
        }
    }
})();