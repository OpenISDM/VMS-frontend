(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('refreshJwtInterceptor', refreshJwtInterceptor);

  /** @ngInject */
  function refreshJwtInterceptor(auth, $q, $http, $state, $log) {
    var service = {

      responseError: function(response) {
        var deferred = $q.defer();

        if (response.status === 401) {
          $log.debug("=== 401 ===");

          var successCallback = function(jwtToken) {
            response.config.headers.Authorization = 'Bearer ' + jwtToken;
            deferred.resolve();
          };
          var failureCallback = function() {
            $state.go('login');
            deferred.reject();
          };

          auth.refreshToken().then(successCallback).catch(failureCallback);

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
