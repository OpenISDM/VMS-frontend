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

        function register(volunteer, successCallback, failureCallback) {
            Restangular.all('register').post(volunteer).then(function(response) {
                successCallback(response);
            }, function(response) {
                failureCallback(response);
            });
        }
    }
})();