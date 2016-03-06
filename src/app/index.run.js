(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, vmsLocalStorage, $rootScope, $state, $stateParams, auth, authPrinciple, $urlRouter) {
    // Restangular.setFullResponse(true);

    // // Set a request interceptor
    // Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
    //   var customHeaders = {};
    //   customHeaders['X-VMS-API-Key'] = '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1';
    //
    //   if (angular.isDefined($state.current.data)) {
    //     if ($state.current.data.needAuth) {
    //       if (authPrinciple.identity()) {
    //         $log.debug('token key exists');
    //
    //         customHeaders['Authorization'] = 'Bearer ' + vmsLocalStorage.getJwt();
    //       } else {
    //         $log.debug('token key is not found');
    //       }
    //     }
    //   }
    //
    //   return {
    //     headers: customHeaders,
    //     params: params,
    //     element: element,
    //     httpConfig: httpConfig
    //   }
    // });

    // Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
    //   if (response.status === 401) {
    //     $log.debug("=== 401 ===");
    //
    //     var successCallback = function(jwtToken) {
    //       response.config.headers.Authorization = "Bearer " + jwtToken;
    //       $http(response.config).then(responseHandler, deferred.reject);
    //     };
    //     var failureCallback = function() {
    //       $state.go('login');
    //     };
    //
    //     auth.refreshToken(successCallback, failureCallback);
    //
    //     return false;
    //   }
    //
    //   return true;
    // });

    // Listen state check start event
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      $log.debug("=== $stateChangeStart ===");
      $rootScope.toState = toState;

      if (toState.data.needAuth) {
        var successCallback = function() {
          $log.debug('pass...');
          $state.go(toState.name);
        };
        var failureCallback = function() {
          event.preventDefault();
          $state.go('login');
        };

        auth.authorize().then(successCallback, failureCallback);
      }
    })

    var urlRouterSyncDeregisteratinoCallback = $rootScope.$on('$locationChange', function(event) {
      event.preventDefault();
      $urlRouter.sync();
    });

    // $rootScope.$on('$destroy', authorizationDeregistrationCallback);
    $rootScope.$on('$destroy', urlRouterSyncDeregisteratinoCallback);

    // Assign global functions
    $rootScope.postAuth = function() {
      $log.debug('isAuthenticated()');
      $log.debug(auth.isAuthenticated());
      $log.debug($rootScope.toState.name);
      if (auth.isAuthenticated() && $rootScope.toState.name == 'login') {
        $log.debug('go to login');
        $state.go('profile');
      } else if (auth.isAuthenticated()) {
        $state.go($rootScope.toState.name);
      }
    }

    $log.debug('runBlock end');
  }

})();
