(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .factory('authPrinciple', authPrinciple);

    /** @ngInject */
    function authPrinciple($q, vmsClient, jwtLocalStorage, $timeout, $log) {
        var _identity = undefined;

        $log.debug("=== _identity ===");
        $log.debug(_identity);

        var _authenticated = false;
        var service = {
            isIdentityResolved: isIdentityResolved,
            isAuthenticated: isAuthenticated,
            authenticate: authenticate,
            identity: identity
        };

        return service;

        function isIdentityResolved() {
            $log.debug("=== authPrinciple.isIdentityResolved() ===");
            return angular.isDefined(_identity);
        }

        function isAuthenticated() {
            $log.debug("=== authPrinciple.isAuthenticated() ===");
            return _authenticated;
        }

        function authenticate(identity) {
            $log.debug("=== authPrinciple.authenticate() ===");
            _identity = identity;
            _authenticated = identity != null;

            if (identity) {
                jwtLocalStorage.set(identity);
            } else {
                jwtLocalStorage.remove();
            }
        }

        function identity(force) {
            $log.debug("=== authPrinciple.identity() ===");
            var deferred = $q.defer();

            if (force === true) _identity = undefined;

            if (angular.isDefined(_identity)) {
                $log.debug("==== _identity is defined ====");
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // retrive the identity data from local storage
            $timeout(function() {
                if (jwtLocalStorage.tokenKeyExists()) {
                    $log.debug("===== tokenKeyExists =====");
                    _identity = jwtLocalStorage.get();
                    _authenticated = true;
                    deferred.resolve(_identity);
                } else {
                    $log.debug("===== tokenKey NOT exist =====");
                    _identity = null;
                    _authenticated = false;
                    deferred.resolve(_identity);
                }
            }, 1000);
            
            return deferred.promise;
        }
    }
})();