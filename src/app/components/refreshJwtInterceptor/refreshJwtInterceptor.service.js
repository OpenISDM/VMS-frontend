(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('refreshJwtInterceptor', refreshJwtInterceptor);

  /** @ngInject */
  function refreshJwtInterceptor($injector, $q, $log, vmsLocalStorage) {
    var service = {

      responseError: function(response) {
        // IMPORTANT!
        // If the service wants use other dependencies, it should use $injector
        // to get the dependencies. Otherwise, the dependency will not be found
        var userAuthentication = $injector.get('userAuthentication');
        var $http = $injector.get('$http');
        var deferred = $q.defer();

        if (response.status === 401 && userAuthentication.isAuthenticated()) {
          $log.debug("=== 401 ===");

          var successCallback = function(authorizationToken) {
            $log.debug("successCallback()");
            $log.debug(authorizationToken);

            response.config.headers.Authorization = authorizationToken;

            deferred.resolve();
          };
          var failureCallback = function() {
            $log.debug("failureCallback()");
            userAuthentication.logout();

            deferred.reject();
          };

          userAuthentication.refreshToken().then(successCallback).catch(failureCallback);

          return deferred.promise.then(function() {
            return $http(response.config);
          });
        }

        return $q.reject(response);
      }
    };

    return service;
  }
})();
