(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userSkillEndpoint', userSkillEndpoint);

  /** @ngInject */
  function userSkillEndpoint(
    $log,
    $http,
    config
  ) {
    var apiBaseUrl = config.apiBaseUrl;
    var service = {
      getAll: getAll,
      update: update,
      getCandidatedKeywords: getCandidatedKeywords
    };

    return service;

    function getAll() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me/skills',
      });
    }

    function update(data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/skills',
        data: data
      });
    }

    function getCandidatedKeywords(keyword) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/skill_candidates/' + keyword
      });
    }
  }

})();
