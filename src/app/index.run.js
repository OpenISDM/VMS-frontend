(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, jwtRequest, jwtLocalStorage, Restangular, $rootScope, $state, $stateParams, authorization, authPrinciple, $urlRouter) {
        // Set a request interceptor
        Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
            $log.log('== what ==');
            $log.log(what);
            $log.debug(jwtRequest);

            var customHeaders = {};
            customHeaders['X-VMS-API-Key'] = '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1';

            if (jwtRequest.indexOf(what) != -1) {
                $log.log('NEED to ADD Token');

                if (jwtLocalStorage.tokenKeyExists()) {
                    $log.log('token key exists');

                    customHeaders['Authorization'] = 'Bearer ' + jwtLocalStorage.get();
                }
            }

            return {
                headers: customHeaders,
                params: params,
                element: element,
                httpConfig: httpConfig
            }
        });

        // Set a response interceptor
        Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            $log.debug('== response ==');

            // Get the refreshed JSON Web Token
            var refreshToken = response.headers('Authorization');

            if (angular.isDefined(refreshToken)) {
                // Set the refreshToken into local storage
                $log.debug("=== Refresh toekn ===");
                $log.debug(refreshToken);
            }

            return data;
        })


        // Listen state check start event
        var authorizationDeregistrationCallback = $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState, fromStateParams) {
            $log.debug("=== $stateChangeStart ===");
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (authPrinciple.isIdentityResolved()) {
                $log.debug("==== isIdentityResolved true ====");

                authorization.authorize();
            }
        })

        var urlRouterSyncDeregisteratinoCallback = $rootScope.$on('$locationChange', function(evt) {
            evt.preventDefault();

            $urlRouter.sync();
        });

        $rootScope.$on('$destroy', authorizationDeregistrationCallback);
        $rootScope.$on('$destroy', urlRouterSyncDeregisteratinoCallback);


        $log.debug('runBlock end');
    }

})();