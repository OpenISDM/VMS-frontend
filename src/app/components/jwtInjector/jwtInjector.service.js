(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('jwtInjector', jwtInjector);

  /** @ngInject */
  function jwtInjector($injector, $log) {
    var service = {

      request: function(config) {
        var authPrinciple = $injector.get('authPrinciple');
        var vmsLocalStorage = $injector.get('vmsLocalStorage');

        if (authPrinciple.identity()) {
          $log.debug('token key exists');

          config.headers['Authorization'] = vmsLocalStorage.getJwt();
        } else {
          $log.debug('token key is not found');
        }

        return config;
      }
    };

    return service;
  }
})();
