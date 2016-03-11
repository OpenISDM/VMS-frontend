(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('apiKeyInjector', apiKeyInjector);

  /** @ngInject */
  function apiKeyInjector(apiKey) {
    var service = {

      request: function(config) {

        config.headers['X-VMS-API-Key'] = apiKey;

        return config;
      }
    };

    return service;
  }
})();
