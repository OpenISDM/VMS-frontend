(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('jwtInjector', jwtInjector);

  /** @ngInject */
  function jwtInjector($state, vmsLocalStorage, authPrinciple, $log) {
    var service = {

      request: function(config) {

        // Check the data attribute exists
        if (angular.isDefined($state.current.data)) {

          // Does the state need to be authenticated ?
          if ($state.current.data.needAuth) {

            if (authPrinciple.identity()) {

              $log.debug('token key exists');

              if (vmsLocalStorage.jwtExists()) {
                config.headers['Authorization'] = 'Bearer ' + vmsLocalStorage.getJwt();
              }
            } else {
              $log.debug('token key is not found');
            }
          }
        }

        return config;
      }
    };

    return service;
  }
})();
