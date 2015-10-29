(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .factory('authPrinciple', authPrinciple);

    /** @ngInject */
    function authPrinciple($q, vmsClient, jwtLocalStorage, $timeout, $log, $http) {
        var _identity = undefined;

        $log.debug("=== _identity ===");
        $log.debug(_identity);

        var _authenticated = false;
        var service = {
            isIdentityResolved: isIdentityResolved,
            isAuthenticated: isAuthenticated,
            authenticate: authenticate,
            refreshToken: refreshToken,
            identity: identity
        };

        return service;

        function isIdentityResolved() {
            $log.debug("=== authPrinciple.isIdentityResolved() ===");
            return angular.isDefined(_identity);
        }

        function isAuthenticated() {
            //$log.debug("=== authPrinciple.isAuthenticated() ===");
            return _authenticated;
        }

        function authenticate(identity) {
            $log.debug("=== authPrinciple.authenticate() ===");
            $log.debug("identity = " + identity);
            _identity = identity;
            _authenticated = identity != null;

            $log.debug("_authenticated = " + _authenticated + " in authenticate()");

            if (identity) {
                jwtLocalStorage.set(identity);
            } else {
                jwtLocalStorage.remove();
            }
        }

        function refreshToken() {
            $log.debug("=== refreshToken() ===");

            var refreshTokenDeferred = $q.defer();

            $timeout(function() {
                vmsClient.refreshToken(function(response) {
                    var refreshToken = response.headers('Authorization');

                    if (angular.isDefined(refreshToken) && refreshToken != null) {
                        // Set the refreshToken into local storage

                        var jwtToken = refreshToken.substring(7);

                        authenticate(jwtToken);

                        refreshTokenDeferred.resolve(jwtToken);                       
                    }
                }, function(response) {
                    authenticate(null);
                    refreshTokenDeferred.reject();
                });
            }, 500);

            return refreshTokenDeferred.promise;
        }

        function identity(force) {
            $log.debug("=== authPrinciple.identity() ===");
            var deferred = $q.defer();

            if (force === true) _identity = undefined;

            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // retrive the identity data from local storage
            $timeout(function() {
                if (jwtLocalStorage.tokenKeyExists()) {
                    _identity = jwtLocalStorage.get();
                    _authenticated = true;
                    deferred.resolve(_identity);
                } else {
                    _identity = null;
                    _authenticated = false;
                    deferred.resolve(_identity);
                }
            }, 500);

            return deferred.promise;
        }
    }
})();