(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .factory('jwtLocalStorage', jwtLocalStorage);

    /** @ngInject */
    function jwtLocalStorage($log, localStorageService) {
        var tokenKey = 'jwt_token';
        var lastNameKey = 'lastName';
        var service = {
            set: set,
            get: get,
            remove: remove,
            tokenKeyExists: tokenKeyExists
        };

        return service;

        function set(token) {
            $log.debug(token);
            return localStorageService.set(tokenKey, token);
        }

        function get() {
            return localStorageService.get(tokenKey);
        }

        function remove() {
            return localStorageService.remove(tokenKey);
        }

        function setLastName(lastName) {
            return localStorageService.set(lastNameKey, lastName);
        }

        function getLastName() {
            $log.debug("getLastName");
            return localStorageService.get(lastNameKey);
        }

        function tokenKeyExists() {
            var lsKeys = localStorageService.keys();

            $log.debug(lsKeys);

            if (lsKeys.indexOf(tokenKey) != -1) {
                return true;
            }

            return false;
        }
    }
})();