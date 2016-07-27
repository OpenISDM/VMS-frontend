(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectHyperlinkEndpoint', projectHyperlinkEndpoint);

  /** @ngInject */
  function projectHyperlinkEndpoint(
    $log,
    $http,
    config
  ) {
    var apiBaseUrl = config.apiBaseUrl;
    var service = {
      getByProjectId: getByProjectId,
      create: create,
      dropByProjectIdAndHyperlinkId: dropByProjectIdAndHyperlinkId,
      createOrUpdate: createOrUpdate
    };

    return service;

    function getByProjectId(projectId) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks'
      });
    }

    function create(projectId, data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks',
        data: data
      });
    }

    function dropByProjectIdAndHyperlinkId(projectId, id) {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks/' + id
      });
    }

    function createOrUpdate(projectId, data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks/create_or_update_bulk',
        data: data
      });
    }
  }
})();
