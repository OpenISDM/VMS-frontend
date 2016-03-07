(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('jwtInjector', jwtInjector);

  /** @ngInject */
  function jwtInjector($injector, $log) {
    var service = {

      request: function(config) {
        var $state = $injector.get('$state');
        var authPrinciple = $injector.get('authPrinciple');
        var vmsLocalStorage = $injector.get('vmsLocalStorage');

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
