(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('authPrinciple', authPrinciple);

  /** @ngInject */
  function authPrinciple(vmsLocalStorage) {
    var service = {
      identity: identity
    };

    return service;

    function identity() {
      return vmsLocalStorage.jwtExists();
    }
  }
})();
