(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('apiKeyHttpInterceptor', apiKeyHttpInterceptor);

  /** @ngInject */
  function apiKeyHttpInterceptor(config) {
    var service = {

      request: function(configHeader) {

        configHeader.headers['X-VMS-API-Key'] = config.apiKey;

        return configHeader;
      }
    };

    return service;
  }
})();
