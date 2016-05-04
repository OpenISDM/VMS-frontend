(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectService', projectService);

  /** @ngInject */
  function projectService(vmsClient, $q, $log) {
    var service = {
      getManagedProjects: getManagedProjects
    };

    function getManagedProjects() {
      var deferred = $q.defer();
      var onSuccess = function() {};
      var onFailure = function() {};

      vmsClient.getManagedProjects().then().catch()
    }

    return service;
  }
})();
