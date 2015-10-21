(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .factory('vmsClient', vmsClient);

    /** @ngInject */
    function vmsClient($log, Restangular) {
        var service = {
            register: register,
            login: login
        };

        return service;

        function register(volunteer, successCallback, failureCallback) {
            Restangular.all('register').post(volunteer).then(function(response) {
                successCallback(response);
            }, function(response) {
                failureCallback(response);
            });
        }

        function login(credentials, successCallback, failureCallback) {
            Restangular.all('auth').post(credentials).then(function(response) {
                successCallback(response);
            }, function(response) {
                failureCallback(response);
            });
        }
    }
})();