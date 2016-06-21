(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('volunteerProfileEndPoint', volunteerProfileEndPoint);

  /** @ngInject */
  function volunteerProfileEndPoint($log, $http, apiBaseUrl) {
    var service = {
      get: get,
      getAttendingProjects: getAttendingProjects
    };

    return service;

    function get() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me'
      });
    }

    function getAttendingProjects(id) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/' + id + '/attending_projects'
      });
    }
  }

})();
