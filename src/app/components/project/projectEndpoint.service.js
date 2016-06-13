(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectEndpoint', projectEndpoint);

  /** @ngInject */
  function projectEndpoint($log, $http, apiBaseUrl) {
    var service = {
      getHyperlinks: getHyperlinks,
      storeHyperlinks: storeHyperlinks
    };

    return service;

    function getHyperlinks(projectId) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks'
      });
    }

    function storeHyperlinks(projectId, data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks',
        data: data
      });
    }
  }
})();
