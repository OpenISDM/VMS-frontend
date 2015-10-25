(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .factory('authorization', authorization);

    /** @ngInject */
    function authorization($rootScope, $state, authPrinciple, $log) {
        var service = {
            authorize: authorize
        };

        return service;

        function authorize() {
            $log.debug('authorize');

            return authPrinciple.identity().then(function() {
                $log.debug("identity success");

                var isAuthenticated = authPrinciple.isAuthenticated();

                // TODO: If there is a RBAC mechanism, it will be add a role control

                // Check if the user was authenticated
                if ($rootScope.toState.data.needAuth) {
                    if (isAuthenticated) {
                        // success
                        $log.debug('Authenticated');
                        // Go to origin state
                        //$state.go($rootScope.toState.name);
                    } else {
                        // failure
                        $log.debug('Not authenticated');
                        $rootScope.returnToState = $rootScope.toState;
                        $rootScope.returnToStateParams = $rootScope.toStateParams;

                        // Go to login page
                        $state.go('login');
                    }
                }
            });
        }
    }
})();