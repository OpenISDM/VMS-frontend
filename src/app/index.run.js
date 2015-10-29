(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, jwtLocalStorage, Restangular, $rootScope, $state, $stateParams, authorization, authPrinciple, $urlRouter, $http) {
        $rootScope.$on('event:refreshToken', function(responseConfig, deferred, responseHandler) {
            authPrinciple.refreshToken(responseConfig, deferred, responseHandler);
        });

        Restangular.setFullResponse(true);

        // Set a request interceptor
        Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
            $log.log('== what ==');
            $log.log(what);

            var customHeaders = {};
            customHeaders['X-VMS-API-Key'] = '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1';

            if (jwtLocalStorage.tokenKeyExists()) {
                $log.log('token key exists');

                customHeaders['Authorization'] = 'Bearer ' + jwtLocalStorage.get();
            }

            return {
                headers: customHeaders,
                params: params,
                element: element,
                httpConfig: httpConfig
            }
        });

        Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
            if (response.status === 401) {
                $log.debug("=== 401 ===");

                if (authPrinciple.isAuthenticated()) {
                    //$log.debug("fired event:refreshToken");
                    //$rootScope.$broadcast('event:refreshToken', response.config, deferred, responseHandler);
                    
                    $log.debug("isAuthenticated");

                    authPrinciple.refreshToken().then(function(jwtToken) {
                        $log.debug("refreshToken success");
                        $log.debug("jwtToken = " + jwtToken);

                        authPrinciple.authenticate(jwtToken);

                        $log.debug("=== response.config ===");
                        $log.debug(response.config);

                        response.config.headers.Authorization = "Bearer " + jwtToken;

                        $http(response.config).then(responseHandler, deferred.reject);
                    }, function(){
                        $log.debug("refreshToken failure");

                        authPrinciple.authenticate(null);
                        $state.go('login');
                    });

                    return false;
                } else {
                    $log.debug("401 isAuthenticated NOT FOUND");

                    return true;
                }
            }

            return true;
        });

        // Listen state check start event
        var authorizationDeregistrationCallback = $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            $log.debug("=== $stateChangeStart ===");
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            $log.debug("toState = ");
            $log.debug(toState);
            $log.debug("toStateParams = "); 
            $log.debug(toStateParams);

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