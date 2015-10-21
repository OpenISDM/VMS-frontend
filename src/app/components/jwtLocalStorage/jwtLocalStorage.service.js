(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .factory('jwtLocalStorage', jwtLocalStorage);

    /** @ngInject */
    function jwtLocalStorage($log, localStorageService) {
        var tokenKey = 'jwt_token';
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

        function tokenKeyExists() {
            var lsKeys = localStorageService.keys();

            if (lsKeys.indexOf(tokenKey) != -1) {
                return true;
            }

            return false;
        }
    }
})();