(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('apiKeyInjector', apiKeyInjector);

  /** @ngInject */
  function apiKeyInjector(config) {
    var service = {

      request: function(configHeader) {

        configHeader.headers['X-VMS-API-Key'] = config.apiKey;

        return configHeader;
      }
    };

    return service;
  }
})();
